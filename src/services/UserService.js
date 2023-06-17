const database = require("../db.js");

module.exports = {
  getPwd: ({ username }) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM users WHERE username = '${username}'`,
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (result.length > 0) {
            accept(result[0]);
          } else {
            accept(false);
          }
        }
      );
    });
  },

  insert: ({ username, name, password }) => {
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO users (username, name, password) VALUES ('${username}', '${name}', '${password}')`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          accept({ username, name });
        }
      );
    });
  },

  getUserBoards: (user_id) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT b.id_board, b.name, b.description, b.style, bu.id_permission FROM boards b, boards_has_users bu WHERE b.id_board = bu.id_board and bu.id_user = ${user_id}`,
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

  findByUserName: (username) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM users WHERE username = '${username}'`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length > 0) {
            accept(results[0]);
          } else {
            accept(false);
          }
        }
      );
    });
  },
};
