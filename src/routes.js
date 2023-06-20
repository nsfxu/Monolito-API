const express = require("express");
const router = express.Router();

const controllers_path = "./controllers";

const UserController = require(`${controllers_path}/UserController.js`);
const BoardController = require(`${controllers_path}/BoardController.js`);
const CardController = require(`${controllers_path}/CardController.js`);
const ColumnController = require(`${controllers_path}/ColumnController.js`);
const GroupController = require(`${controllers_path}/GroupController.js`);
const SwinlaneController = require(`${controllers_path}/SwinlaneController.js`);
const TagsController = require(`${controllers_path}/TagsController.js`);
const CommentController = require(`${controllers_path}/CommentController.js`);

//#region ROUTE NAMES
const userRoute = "user";
const groupRoute = "group";
const columnRoute = "column";
const boardRoute = "board";
const cardRoute = "card";
const swinlaneRoute = "swinlane";
const tagsRoute = "tags";
const commentsRoute = "comments";

//#endregion

//#region USERS
// router.get('/users', UserController.getAll);
// router.get('/user/:id_user', UserController.getUser);
router.post(`/${userRoute}/find`, UserController.findByUserName);
router.post(`/${userRoute}/create`, UserController.createUser);
router.post(`/${userRoute}/login`, UserController.login);
router.get(`/${userRoute}/boards/:user_id`, UserController.getUserBoards);
// router.put('/user/:id_user', UserController.update);
// router.delete('/user/:id_user', UserController.delete);

//#endregion

//#region GROUP
router.post(`/${groupRoute}/create`, GroupController.createGroup);
router.put(`/${groupRoute}/:id_group`, GroupController.updateGroup);
router.delete(`/${groupRoute}/:id_group`, GroupController.deleteGroup);

//#endregion

//#region COLUMN
router.put(`/${columnRoute}/order/:id_board`, ColumnController.updateOrder);
router.post(`/${columnRoute}/create`, ColumnController.createColumn);
router.put(`/${columnRoute}/:id_column`, ColumnController.updateColumn);
router.delete(`/${columnRoute}/:id_column`, ColumnController.deleteColumn);

//#endregion

//#region BOARD

router.post(`/${boardRoute}/create`, BoardController.create);
router.put(`/${boardRoute}/:board_id`, BoardController.updateBoardInfo);
router.get(`/${boardRoute}/info/:board_id`, BoardController.getBoardInfo);

// router.get(`/${boardRoute}/:board_id`, BoardController.getInfo);
router.get(`/${boardRoute}/:board_id`, BoardController.getInfoV2);

router.get(
  `/${boardRoute}/users/:board_id`,
  BoardController.getBoardParticipants
);
router.post(
  `/${boardRoute}/:board_id/users/:user_id`,
  BoardController.addUserToBoard
);
router.delete(
  `/${boardRoute}/:board_id/users/:user_id`,
  BoardController.deleteUserFromBoard
);
router.put(
  `/${boardRoute}/:board_id/users/:user_id`,
  BoardController.updateUserPermission
);

//#endregion

//#region CARD

router.post(`/${cardRoute}/create`, CardController.createCard);
router.put(`/${cardRoute}/:id_card`, CardController.updateCardGroup);
router.post(`/${cardRoute}/order`, CardController.updateCardGroupV2);
router.put(`/${cardRoute}/edit/:id_card`, CardController.updateCard);
router.put(`/${cardRoute}/edit/expected/:id_card`, CardController.updateCardExpectedDate);
router.delete(`/${cardRoute}/:id_card`, CardController.deleteCard);

//#endregion

//#region SWINLANE
router.put(`/${swinlaneRoute}/order/:id_board`, SwinlaneController.updateOrder);
router.post(`/${swinlaneRoute}/create`, SwinlaneController.createSwinlane);
router.put(`/${swinlaneRoute}/:id_swinlane`, SwinlaneController.updateSwinlane);
router.delete(
  `/${swinlaneRoute}/:id_swinlane`,
  SwinlaneController.deleteSwinlane
);

//#endregion

//#region TAGS

router.delete(`/${tagsRoute}/:id_tag`, TagsController.deleteTag);
router.post(`/${tagsRoute}/create`, TagsController.createTag);
router.put(`/${tagsRoute}/:id_tag`, TagsController.updateTag);

router.put(`/${tagsRoute}/card/:id_card`, TagsController.updateCardTags);
// router.delete(`/${swinlaneRoute}/:id_swinlane`, SwinlaneController.deleteSwinlane);

//#endregion

//#region COMMENTS
router.get(`/${commentsRoute}/card/:id_card`, CommentController.getCommentsByCardId);
router.post(`/${commentsRoute}/card/:id_card`, CommentController.createComment);
//#endregion

module.exports = router;
