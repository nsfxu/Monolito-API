const UserService = require("../services/UserService.js");
// const BoardService = require("../services/BoardService.js");
const bcrypt = require("bcrypt");

module.exports = {
  findByUserName: async (req, res) => {
    let json = { error: "", result: {} };
    const username = req.body.username;

    if (username) {
      const response = await UserService.findByUserName(username);

      if (response) {
        json.result = {
          id_user: response.id_user,
          username: response.username,
          name: response.name,
        };
      } else {
        json.error = "User not found";
      }
    } else {
      json.error = "Invalid username";
    }

    res.json(json);
  },

  login: async (req, res) => {
    let json = { error: "", result: {} };
    let userObject = {
      username: req.body.username,
      password: req.body.password,
    };

    let bdUserObject = await UserService.getPwd(userObject);

    if (bdUserObject) {
      if (bcrypt.compareSync(userObject.password, bdUserObject.password)) {
        json.result = {
          id_user: bdUserObject.id_user,
          username: bdUserObject.username,
          name: bdUserObject.name,
        };
      } else {
        json.error = "Usuário ou senha incorretas!";
      }
    } else {
      json.error = "Usuário ou senha incorretas!";
    }

    res.json(json);
  },

  createUser: async (req, res) => {
    let json = { error: "", result: {} };

    let userObject = {
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
    };

    userObject.password = await bcrypt.hash(userObject.password, 10);

    if (userObject.username && userObject.name && userObject.password) {
      let result = await UserService.insert(userObject);
      json.result = result;
    } else {
      json.error = "Wrong user parameters";
    }

    res.json(json);
  },

  getUserBoards: async (req, res) => {
    let json = { error: "", result: [] };

    const user_id = req.params.user_id;

    let boards_users = await UserService.getUserBoards(user_id);

    if (boards_users) {
      json.result = boards_users;
    } else {
      json.error = "The current user does not have a board assigned.";
    }
    res.json(json);
  },
};
