const database = require("../db.js");

module.exports = {
  getSwinlanesByBoardId: (id_board) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT s.id_swinlane, s.name, s.style, s.order FROM swinlanes s WHERE s.id_board = ${id_board} ORDER BY s.order`,
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
