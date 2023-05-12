const express = require("express");
const router = express.Router();

const controllers_path = "./controllers";

const UserController = require(`${controllers_path}/UserController.js`);
const BoardController = require(`${controllers_path}/BoardController.js`);

//#region USERS

// router.get('/users', UserController.getAll);
// router.get('/user/:id_user', UserController.getUser);
router.post("/user/create", UserController.createUser);
router.post("/user/login", UserController.login);
router.get("/user/boards/:user_id", UserController.getUserBoards);
// router.put('/user/:id_user', UserController.update);
// router.delete('/user/:id_user', UserController.delete);

//#endregion

//#region
router.get("/board/:board_id", BoardController.getInfo);
//#endregion

module.exports = router;
