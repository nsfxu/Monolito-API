const database = require("../db.js");

module.exports = {
  createSwinlane: ({ order, name, style, id_board }) => {
    return new Promise((accept, reject) => {
      let orderBy = "`order`";

      database.query(
        `INSERT INTO swinlanes (${orderBy}, name, style, id_board) VALUES (${order}, '${name}', ${style}, ${id_board})`,
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

  deleteSwinlane: (id_swinlane) => {
    return new Promise((accept, reject) => {
      database.query(
        `DELETE from swinlanes WHERE id_swinlane = ${id_swinlane}`,
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

  updateSwinlane: ({ id_swinlane, name, style }) => {
    return new Promise((accept, reject) => {
      database.query(
        `UPDATE swinlanes SET name = '${name}', style = '${style}' WHERE id_swinlane = ${id_swinlane}`,
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

  getSwinlanesByBoardId: (id_board) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM swinlanes s WHERE id_board = ${id_board} ORDER BY s.order`,
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

  getLastOrderByBoardId: (id_board) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT s.order FROM swinlanes s WHERE id_board = ${id_board} ORDER BY s.order DESC LIMIT 1`,
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

  updateSwinlaneOrder: (id_swinlane, order) => {
    return new Promise((accept, reject) => {
      let orderBy = "`order`";

      database.query(
        `UPDATE swinlanes SET ${orderBy} = ${order} WHERE id_swinlane = ${id_swinlane}`,
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
};
