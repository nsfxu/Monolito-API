const express = require("express");
const router = express.Router();

const controllers_path = "./controllers";

const UserController = require(`${controllers_path}/UserController.js`);

//#region USERS

// router.get('/users', UserController.getAll);
// router.get('/user/:id_user', UserController.getUser);
router.post('/user/create', UserController.createUser);
router.post('/user/login', UserController.login);
// router.put('/user/:id_user', UserController.update);
// router.delete('/user/:id_user', UserController.delete);

//#endregion

module.exports = router;
