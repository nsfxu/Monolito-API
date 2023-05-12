const UserService = require("../services/UserService.js");

module.exports = {
  getAll: async (req, res) => {
    let json = { error: "", result: [] };
    let users = await UserService.getAll();

    users.map((user, index) => {
      json.result.push({
        id_user: user.id_user,
        username: user.username,
        name: user.name,
      });
    });

    res.json(json);
  },

  getUser: async (req, res) => {
    let json = { error: "", result: {} };

    let id_user = req.params.id_user;
    let user = await UserService.getUser(id_user);


    if (user) {
      json.result = user;
    } else {
      json.error = "User not found";
    }

    res.json(json);
  },
};
