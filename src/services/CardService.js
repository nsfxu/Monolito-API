const database = require("../db.js");

module.exports = {
  getCardsByGroupId: (id_group) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT c.id_card, c.name, c.description, c.style, u.name FROM cards c, users u WHERE c.id_user = u.id_user and c.id_group = ${id_group} ORDER BY c.order`,
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
