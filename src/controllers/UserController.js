const UserService = require("../services/UserService.js");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    let userObject = {
      username: req.body.username,
      password: req.body.password,
    };

    let hash_pwd = await UserService.getPwd(userObject);

    if (hash_pwd) {
      if (bcrypt.compareSync(userObject.password, hash_pwd)) {
        res.send("Successful");
      } else {
        res.json({ error: "Incorrect Email and/or Password!" });
      }
    } else {
      res.json({ error: "Incorrect Email and/or Password!" });
    }
  },

  insert: async (req, res) => {
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
