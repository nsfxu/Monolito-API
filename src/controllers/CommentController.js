const CommentService = require("../services/CommentService.js");

module.exports = {
  getCommentsByCardId: async (req, res) => {
    let json = { error: "", result: {} };

    const id_card = req.params.id_card;

    if (id_card) {
      const response = await CommentService.getCommentsByCardId(id_card);

      if (response) {
        json.result = response;
      } else {
        json.result = [];
      }
    } else {
      json.error = "Wrong id_card.";
    }

    res.json(json);
  },
  createComment: async (req, res) => {
    let json = { error: "", result: {} };

    const commObject = {
      id_card: req.params.id_card,
      id_user: req.body.id_user,
      message: req.body.message,
    };

    if (commObject.id_card && commObject.id_user && commObject.message) {
      const response = await CommentService.createBoard(commObject);

      if (response) {
        json.result = response;
      } else {
        json.error = "Wrong comments parameters";
      }
    } else {
      json.error = "Wrong comments parameters.";
    }

    res.json(json);
  },
};
