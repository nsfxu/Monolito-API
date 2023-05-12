const express = require("express");
const router = express.Router();

const controllers_path = "./controllers";

const UserController = require(`${controllers_path}/UserController.js`);

// USERS
router.get('/users', UserController.getAll);
router.get('/user/:id_user', UserController.getUser);


module.exports = router;
