const database = require("../db.js");

module.exports = {
  createColumn: ({ name, id_board, column_order }) => {
    return new Promise((accept, reject) => {
      let orderBy = "`order`";

      database.query(
        `INSERT INTO columns (${orderBy}, name, show_wip, wip_limit, id_board) VALUES (${column_order}, '${name}', 'false', 0, ${id_board})`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          accept(results);
        }
      );
    });
  },

  updateColumnInfo: ({
    id_column,
    name,
    show_swinlane,
    show_wip,
    wip_limit,
  }) => {
    return new Promise((accept, reject) => {
      database.query(
        `UPDATE columns SET name = '${name}', show_swinlane = '${show_swinlane}', show_wip = '${show_wip}', wip_limit = '${wip_limit}' WHERE id_column = ${id_column}`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          accept(results);
        }
      );
    });
  },

  deleteColumn: (id_column) => {
    return new Promise((accept, reject) => {
      database.query(
        `DELETE from columns WHERE id_column = ${id_column}`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          accept(results.affectedRows);
        }
      );
    });
  },

  deleteColumnLinks: (id_column) => {
    return new Promise((accept, reject) => {
      database.query(
        `DELETE from columns_has_groups WHERE id_column = ${id_column}`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          accept(results.affectedRows);
        }
      );
    });
  },

  updateColumnOrder: (id_column, order) => {
    return new Promise((accept, reject) => {
      let orderBy = "`order`";

      database.query(
        `UPDATE columns SET ${orderBy} = ${order} WHERE id_column = ${id_column}`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          accept(results);
        }
      );
    });
  },

  getColumnsAndGroupsByBoardId: (id_board) => {
    return new Promise((accept, reject) => {
      database.query(
        "SELECT c.id_column, c.order as 'column_order', c.name as 'column_name', c.show_swinlane, c.style, g.id_group, g.order as 'group_order', g.name as 'group_name' FROM columns c, columns_has_groups cg, `groups` g WHERE cg.id_group = g.id_group and cg.id_column = c.id_column and c.id_board = ? ORDER BY c.order, g.order",
        [id_board],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length > 0) {
            accept(results);
          } else {
            accept(false);
          }
        }
      );
    });
  },

  getColumnCountByBoardId: (id_board) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT c.order FROM columns c WHERE id_board = ${id_board} ORDER BY c.order DESC LIMIT 1`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length > 0) {
            accept(results[0].order);
          } else {
            accept(-1);
          }
        }
      );
    });
  },
};
