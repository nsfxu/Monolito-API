const UserService = require("../services/UserService.js");
const bcrypt = require("bcrypt");

module.exports = {
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
        json.error = "Incorrect Email and/or Password!";
      }
    } else {
      json.error = "Incorrect Email and/or Password!";
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
};
