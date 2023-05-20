const BoardService = require("../services/BoardService.js");
const ColumnService = require("../services/ColumnService.js");

const boardInfoUtils = require("../utils/boardInfoUtils.js");
const CardService = require("../services/CardService.js");
const TagsService = require("../services/TagsService.js");
const SwinlaneService = require("../services/SwinlaneService.js");

module.exports = {
  getInfo: async (req, res) => {
    let json = { error: "", result: {} };
    let base_json = { ...require("../constants/base_board_info.js") };

    const board_id = req.params.board_id;

    const board = await BoardService.getBoard(board_id);

    if (board) {
      const columns_and_groups =
        await ColumnService.getColumnsAndGroupsByBoardId(board_id);

      const all_boards_tags = await TagsService.getTagsByBoardId(board_id);

      if (all_boards_tags) {
        base_json.tags = JSON.parse(JSON.stringify(all_boards_tags));
      } else {
        base_json.tags = [];
      }

      const all_boards_swinlanes = await SwinlaneService.getSwinlanesByBoardId(
        board_id
      );

      if (all_boards_swinlanes) {
        base_json.swinlanes = JSON.parse(JSON.stringify(all_boards_swinlanes));
      } else {
        base_json.swinlanes = [];
      }

      if (columns_and_groups) {
        const all_group_cards = await CardService.getBatchOfCards(
          columns_and_groups
        );

        const all_cards_tags = await CardService.getBatchOfCardsTags(
          columns_and_groups
        );

        function_result = await boardInfoUtils.mountColumnGroupsCardsObject(
          columns_and_groups,
          all_cards_tags,
          all_group_cards
        );

        console.log(function_result);

        if (function_result) {
          base_json.columns = function_result.columns;
          base_json.nextColumnId = function_result.nextColumnId;
          base_json.nextGroupId = function_result.nextGroupId;
          base_json.nextCardId = all_group_cards.length;
          base_json.nextSwinlaneId = all_boards_swinlanes.length;
        }
      }

      json.result = base_json;
    } else {
      json.error = "This board does not exists";
    }

    res.json(json);
  },
};
