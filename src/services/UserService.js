const database = require("../db.js");

module.exports = {
  getAll: () => {
    return new Promise((accept, reject) => {
      database.query("SELECT * FROM users", (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        accept(results);
      });
    });
  },

  getUser: (id_user) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM users WHERE id_user = ${id_user}`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length > 0) accept(results[0]);
          else accept(false);

          accept(results);
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

          accept({ username, name, password });
        }
      );
    });
  },

  update: ({ id_user, username, name, password }) => {
    return new Promise((accept, reject) => {
      database.query(
        `UPDATE users SET username = '${username}', name = '${name}', password = '${password}' WHERE id_user = '${id_user}'`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          accept({ id_user, username, name, password });
        }
      );
    });
  },

  delete: (id_user) => {
    return new Promise((accept, reject) => {
      database.query(
        `DELETE from users WHERE id_user = '${id_user}'`,
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
};
