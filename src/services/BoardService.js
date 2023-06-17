const database = require("../db.js");

module.exports = {
  createBoard: ({ id_user, name, description }) => {
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO boards (name, description) VALUES ('${name}', '${description}')`,
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
  addUserToBoard: (board_id, id_user, id_permission) => {
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO boards_has_users (id_board, id_user, id_permission) VALUES (${board_id}, ${id_user}, ${id_permission})`,
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
  getAllColumnsFromBoard: (id_board) => {
    return new Promise((accept, reject) => {
      const orderBy = "`order`";
      database.query(
        `SELECT * FROM columns WHERE id_board = ${id_board} ORDER BY ${orderBy}`,
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
  getBoardsBatch: (ids_boards) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM boards WHERE id_board IN (${ids_boards})`,
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
  getBoard: (id_boards) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT * FROM boards WHERE id_board = ${id_boards}`,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          if (results.length > 0) accept(results[0]);
          else accept(false);
        }
      );
    });
  },
  getBoardParticipants: (id_boards) => {
    return new Promise((accept, reject) => {
      database.query(
        `SELECT u.id_user, u.name, u.username, bu.id_permission FROM users u, boards_has_users bu WHERE u.id_user = bu.id_user AND bu.id_board = ${id_boards}`,
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
  addUserToBoard: ({ board_id, user_id, permission_id }) => {
    return new Promise((accept, reject) => {
      database.query(
        `INSERT INTO boards_has_users (id_board, id_user, id_permission) VALUES (${board_id}, ${user_id}, ${permission_id})`,
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
  deleteUserFromBoard: (board_id, user_id) => {
    return new Promise((accept, reject) => {
      database.query(
        `DELETE from boards_has_users WHERE id_board = ${board_id} AND id_user = ${user_id}`,
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
  updateUserPermission: ({ board_id, user_id, permission_id }) => {
    return new Promise((accept, reject) => {
      database.query(
        `UPDATE boards_has_users SET id_permission = ${permission_id}, WHERE id_board = ${board_id} AND id_user = ${user_id}`,
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
