const database = require("../db.js");

module.exports = {
  getTagsByBoardId: (id_board) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM tags WHERE id_board = ${id_board}`,
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
  assignTagsToCard: (values) => {
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO cards_has_tags (id_card, id_tag) VALUES ${values}`,
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
  deleteAllLinksByCardId: (id_card) => {
    return new Promise((accept, reject) => {
      database.query(
        `DELETE from cards_has_tags WHERE id_card = ${id_card}`,
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
