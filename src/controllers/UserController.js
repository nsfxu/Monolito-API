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

  insert: async (req, res) => {
    let json = { error: "", result: {} };

    let userObject = {
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
    };

    if (userObject.username && userObject.name && userObject.password) {
      let result = await UserService.insert(userObject);
      json.result = result;
    } else {
      json.error = "Wrong user parameters";
    }

    res.json(json);
  },

  update: async (req, res) => {
    let json = { error: "", result: {} };

    let userObject = {
      id_user: req.params.id_user,
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
    };

    if (
      userObject.id_user &&
      userObject.username &&
      userObject.name &&
      userObject.password
    ) {
      await UserService.update(userObject);
      json.result = userObject;
    } else {
      json.error = "Wrong user parameters";
    }

    res.json(json);
  },

  delete: async (req, res) => {
    let json = { error: "", result: {} };
    let id_user = req.params.id_user;

    if (id_user) {
      let result = await UserService.delete(id_user);

      if (result > 0) json.result = "User deleted!";
      else json.result = "User id does not exists.";
    } else {
      json.error = "Invalid user id";
    }

    res.json(json);
  },
};
