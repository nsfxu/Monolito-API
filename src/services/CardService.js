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
        `SELECT c.id_card as 'id', c.id_group, c.name, c.description, c.style, c.id_swinlane as 'laneId', c.id_user FROM cards c WHERE id_group in (${all_group_ids}) ORDER BY c.order;`,
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

  getBatchOfCardsTags: (column_and_group) => {
    let all_group_ids = "";
    let clone_cag = [...column_and_group];

    clone_cag.map((column) => {
      all_group_ids = all_group_ids + column.id_group + ",";
    });

    all_group_ids = all_group_ids.substring(all_group_ids.length - 1, 0);

    return new Promise((accept, reject) => {
      database.query(
        `SELECT c.id_card, CONCAT('[', GROUP_CONCAT(ct.id_tag), ']') as 'tags' FROM cards c, cards_has_tags ct WHERE c.id_card = ct.id_card and id_group in (${all_group_ids}) GROUP by c.id_card;
        `,
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

  updateCardsOrder: (set, where) => {
    return new Promise((accept, reject) => {
      database.query(
        `UPDATE cards c SET ${set} WHERE ${where}`,
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

  updateCard: ({
    name,
    description,
    style,
    id_group,
    id_user,
    id_swinlane,
    id_card,
  }) => {
    console.log(
      name,
      description,
      style,
      id_group,
      id_user,
      id_swinlane,
      id_card
    );
    return new Promise((accept, reject) => {
      database.query(
        `UPDATE cards SET name = '${name}', description = "${description}", style = ${style}, id_group = ${id_group}, id_user = ${id_user}, id_swinlane = ${id_swinlane} WHERE (id_card = ${id_card})`,
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

  createCard: ({
    name,
    description,
    style,
    id_group,
    id_swinlane,
    id_user,
  }) => {
    let orderBy = "`order`";
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO cards (${orderBy}, description, name, style, id_group, id_user, id_swinlane)  VALUES (0,'${description}','${name}',${style},${id_group},${id_user},${id_swinlane})`,
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

  getCardsByGroupsIds: (id_groups) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM cards c WHERE id_group in ${id_groups} ORDER BY c.order`,
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
