const database = require("../db.js");

module.exports = {
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
};
