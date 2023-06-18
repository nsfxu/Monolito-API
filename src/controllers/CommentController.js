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
};
