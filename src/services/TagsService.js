const database = require("../db.js");

module.exports = {
  getTagsByBoardId: (id_board) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT t.id_tag, t.name, t.style FROM tags t WHERE t.id_board = ${id_board}`,
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
