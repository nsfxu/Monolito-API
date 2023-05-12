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
};
