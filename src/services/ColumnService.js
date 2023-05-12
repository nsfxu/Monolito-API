const database = require("../db.js");

module.exports = {
  getColumnsAndGroupsByBoardId: (id_board) => {
    return new Promise((accept, reject) => {
      database.query(
        "SELECT c.id_column, c.order as 'column_order', c.name as 'column_name', c.show_swinlane, c.style, g.id_group, g.order as 'group_order', g.name as 'group_name' FROM columns c, columns_has_groups cg, `groups` g WHERE cg.id_group = g.id_group and cg.id_column = c.id_column and c.id_board = ? ORDER BY c.order, g.order",
        [id_board],
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
