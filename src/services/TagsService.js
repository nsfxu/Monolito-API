const database = require("../db.js");

module.exports = {
  getCardTagsByIdsCard: (ids_card) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT c.id_card, CONCAT('[', GROUP_CONCAT(cht.id_tag), ']') as 'tags' FROM cards c INNER JOIN cards_has_tags cht ON c.id_card = cht.id_card WHERE c.id_card in ${ids_card} GROUP by c.id_card`,
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
  createTag: ({ name, style, id_board }) => {
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO tags (name, style, id_board) VALUES ('${name}', ${style}, ${id_board})`,
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
  updateTag: ({ id_tag, name, style }) => {
    return new Promise((accept, reject) => {
      database.query(
        `UPDATE tags SET name = '${name}', style = '${style}' WHERE id_tag = ${id_tag}`,
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
  deleteTag: (id_tag) => {
    return new Promise((accept, reject) => {
      database.query(
        `DELETE from tags WHERE id_tag = ${id_tag}`,
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
  deleteTagLink: (id_tag) => {
    return new Promise((accept, reject) => {
      database.query(
        `DELETE from cards_has_tags WHERE id_tag = ${id_tag}`,
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
