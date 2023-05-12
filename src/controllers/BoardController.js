const BoardService = require("../services/BoardService.js");
const ColumnService = require("../services/ColumnService.js");
const CardService = require("../services/CardService.js");

const boardInfoUtils = require("../utils/boardInfoUtils.js");

module.exports = {
  getInfo: async (req, res) => {
    let json = { error: "", result: {} };
    let base_json = require("../constants/base_board_info.js");

    const board_id = req.params.board_id;

    const board = await BoardService.getBoard(board_id);

    if (board) {
      const columns_and_groups =
        await ColumnService.getColumnsAndGroupsByBoardId(board_id);

      if (columns_and_groups) {
        function_result =
          boardInfoUtils.mountColumnAndGroupsObject(columns_and_groups);

        if (function_result) {
          let columns = function_result.columns;

          columns.map((column) => {
            column.groups.map(async (group) => {
                 console.log(await CardService.getCardsByGroupId(group.id));
            })
          })
          base_json.columns = function_result.columns;
          base_json.nextColumnId = function_result.nextColumnId;
          base_json.nextGroupId = function_result.nextGroupId;
        }
      }

      // get tags

      // get swinlanes

      json.result = base_json;
    } else {
      json.error = "This board does not exists";
    }

    res.json(json);
  },
};
