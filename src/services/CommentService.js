const database = require("../db.js");

module.exports = {
  createBoard: ({ id_card, id_user, message }) => {
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO comments (message, id_user, id_card) VALUES ('${message}', ${id_user}, ${id_card})`,
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
  getCommentsByCardId: (id_card) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT c.id_comment, c.message, c.createdDate, u.id_user, u.username, u.name FROM comments c, users u WHERE c.id_user = u.id_user AND c.id_card = ${id_card}`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length > 0) {
            accept(results);
          } else accept(false);
        }
      );
    });
  },
};
