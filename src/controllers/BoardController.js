const BoardService = require("../services/BoardService.js");
const ColumnService = require("../services/ColumnService.js");

const boardInfoUtils = require("../utils/boardInfoUtils.js");
const { getCardsByGroupId } = require("../services/CardService.js");
const CardService = require("../services/CardService.js");

module.exports = {
  getInfo: async (req, res) => {
    let json = { error: "", result: {} };
    let base_json = { ...require("../constants/base_board_info.js") };

    const board_id = req.params.board_id;

    const board = await BoardService.getBoard(board_id);

    if (board) {
      const columns_and_groups =
        await ColumnService.getColumnsAndGroupsByBoardId(board_id);

      const all_group_cards = await CardService.getBatchOfCards(
        columns_and_groups
      );

      if (columns_and_groups) {
        function_result = await boardInfoUtils.mountColumnGroupsCardsObject(
          columns_and_groups,
          all_group_cards
        );

        if (function_result) {
          base_json.columns = function_result.columns;
          base_json.nextColumnId = function_result.nextColumnId;
          base_json.nextGroupId = function_result.nextGroupId;
        }
      }

      json.result = base_json;
    } else {
      json.error = "This board does not exists";
    }

    res.json(json);
  },
};
