const database = require("../db.js");
const bcrypt = require("bcrypt");

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
};
