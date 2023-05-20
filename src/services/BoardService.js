const database = require("../db.js");

module.exports = {
  getBoardsBatch: (ids_boards) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM boards WHERE id_board IN (${ids_boards})`,
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
  getBoard: (id_boards) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM boards WHERE id_board = ${id_boards}`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length > 0) accept(results[0]);
          else accept(false);
        }
      );
    });
  },
  getBoardParticipants: (id_boards) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT u.id_user, u.name, bu.id_permission FROM users u, boards_has_users bu WHERE u.id_user = bu.id_user AND bu.id_board = ${id_boards}`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length > 0) accept(results);
          else accept(false);
        }
      );
    });
  },
};
