const BoardService = require("../services/BoardService.js");

module.exports = {
  getInfo: async (req, res) => {
    let json = { error: "", result: {} };

    const base_json = require("../constants/base_board_info.js");

    
    // get columns
    // get tags
    // get swinlanes
    // get counts

    res.json(json);
  },
};
