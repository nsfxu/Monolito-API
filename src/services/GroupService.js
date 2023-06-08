const database = require("../db.js");

module.exports = {
  createGroup: ({ order, name }) => {
    return new Promise((accept, reject) => {
      let orderBy = "`order`";
      let groups = "`groups`";

      database.query(
        `INSERT INTO ${groups} (${orderBy}, name) VALUES (${order}, '${name}')`,
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

  linkGroupWithBoardId: (id_column, id_group) => {
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO columns_has_groups (id_column, id_group) VALUES (${id_column}, ${id_group})`,
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
};
