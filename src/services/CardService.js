const database = require("../db.js");

module.exports = {
  getBatchOfCards: (column_and_group) => {
    let all_group_ids = "";
    let clone_cag = [...column_and_group];

    clone_cag.map((column) => {
      all_group_ids = all_group_ids + column.id_group + ",";
    });

    all_group_ids = all_group_ids.substring(all_group_ids.length - 1, 0);

    return new Promise((accept, reject) => {
      database.query(
        `SELECT c.id_card as 'id', c.name, c.description, c.style, c.id_swinlane as 'laneId', c.id_user, CONCAT('[', GROUP_CONCAT(ct.id_tag), ']') as 'tags' FROM cards c, cards_has_tags ct WHERE c.id_card = ct.id_card and id_group in (${all_group_ids}) GROUP by c.id_card, c.name, c.description, c.style, c.id_swinlane, c.id_user, c.order ORDER BY c.order;`,
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
