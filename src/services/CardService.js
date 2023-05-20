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

  updateCardGroup: ({ id_card, order, id_group, id_swinlane }) => {
    return new Promise((accept, reject) => {
      // UPDATE `monolito`.`cards` SET `order` = '1', `description` = 'E', `id_group` = '2' WHERE (`id_card` = '2') and (`id_group` = '1') and (`id_user` = '1');
      database.query(
        `UPDATE cards c SET c.order = '${order}', c.id_group = '${id_group}', c.id_swinlane = ${id_swinlane} WHERE c.id_card = ${id_card}`,
        (error, result) => {
          if (error) {
            reject(error);

            return;
          }

          if (result.affectedRows > 0) accept(true);
          else accept(false);
        }
      );
    });
  },
};
