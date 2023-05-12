const express = require("express");
const router = express.Router();

const controllers_path = "./controllers";

const UserController = require(`${controllers_path}/UserController.js`);

//#region USERS

router.get('/users', UserController.getAll);
router.get('/user/:id_user', UserController.getUser);
router.post('/user', UserController.insert);
router.put('/user/:id_user', UserController.update);

//#endregion

module.exports = router;
