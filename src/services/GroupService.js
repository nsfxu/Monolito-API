const database = require("../db.js");

module.exports = {
  createGroup: ({ order, name }) => {
    return new Promise((accept, reject) => {
      let orderBy = "`order`";
      let groups = "`groups`";

      database.query(
        `INSERT INTO ${groups} (${orderBy}, name) VALUES (${order}, '${name}')`,
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

  deleteGroup: (id_group) => {
    return new Promise((accept, reject) => {
      const groups = "`groups`";
      database.query(
        `DELETE from ${groups} WHERE id_group = ${id_group}`,
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

  deleteGroupLinks: (id_group) => {
    return new Promise((accept, reject) => {
      database.query(
        `DELETE from columns_has_groups WHERE id_group = ${id_group}`,
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

  linkGroupWithBoardId: (id_column, id_group) => {
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO columns_has_groups (id_column, id_group) VALUES (${id_column}, ${id_group})`,
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

  getLastOrderByColumnId: (id_column) => {
    return new Promise((accept, reject) => {
      const groups = "`groups`";
      database.query(
        `SELECT g.order FROM ${groups} g, columns_has_groups chg WHERE g.id_group = chg.id_group AND chg.id_column = ${id_column} ORDER BY g.order DESC LIMIT 1`,
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
