const BoardService = require("../services/BoardService.js");
const ColumnService = require("../services/ColumnService.js");

const boardInfoUtils = require("../utils/boardInfoUtils.js");
const CardService = require("../services/CardService.js");
const TagsService = require("../services/TagsService.js");
const SwinlaneService = require("../services/SwinlaneService.js");
const { all } = require("../routes.js");
const GroupService = require("../services/GroupService.js");

module.exports = {
  create: async (req, res) => {
    let json = { error: "", result: {} };

    const boardObj = {
      id_user: req.body.id_user,
      name: req.body.name,
      description: req.body.description ? req.body.description : "",
    };

    if (boardObj.id_user && boardObj.name) {
      const board_response = await BoardService.createBoard(boardObj);

      const response = await BoardService.addUserToBoard(
        board_response.insertId,
        boardObj.id_user,
        1
      );

      if (response) {
        json.result = boardObj;
      } else {
        json.error = "Wrong card parameters";
      }
    } else {
      json.error = "Wrong card parameters";
    }

    res.json(json);
  },

  getInfoV2: async (req, res) => {
    const json = { error: "", result: {} };
    const base_json = {
      columns: [],
      tags: [],
      swinlanes: [],
    };

    const board_id = req.params.board_id;

    if (!board_id || isNaN(parseInt(board_id))) {
      json.error = "Board id inválido";
      res.json(json);

      return;
    }

    const all_columns = await BoardService.getAllColumnsFromBoard(board_id);

    let all_columns_ids = [];

    // list all columns into base json
    if (all_columns) {
      all_columns.map((this_column) => {
        all_columns_ids.push(this_column.id_column);

        base_json.columns.push({
          id: this_column.id_column,
          name: this_column.name,
          showSwinLanes: this_column.show_swinlane,
          showWip: this_column.show_wip,
          style: this_column.style,
          groups: [],
        });
      });
    }

    // check if base_json have columns
    // if yes, then populate the groups with the cards

    if (base_json.columns.length > 0) {
      // change all [] to () to be used into the "in" method in MYSQL Query
      all_columns_ids =
        boardInfoUtils.changeBracketsToParenthesis(all_columns_ids);

      const all_groups = await GroupService.getGroupsByColumnsIds(
        all_columns_ids
      );

      let all_groups_ids = [];

      // populating groups in column
      if (all_groups) {
        base_json.columns.map((column) => {
          all_groups.map((this_group) => {
            if (column.id == this_group.id_column) {
              all_groups_ids.push(this_group.id_group);

              column.groups.push({
                id: this_group.id_group,
                name: this_group.name,
                cards: [],
              });
            }
          });
        });
      }

      // populating cards in groups
      if (all_groups_ids.length > 0) {
        all_groups_ids =
          boardInfoUtils.changeBracketsToParenthesis(all_groups_ids);

        const all_cards = await CardService.getCardsByGroupsIds(all_groups_ids);

        if (all_cards) {
          base_json.columns.map((current_column) => {
            current_column.groups.map((current_group) => {
              all_cards.map((this_card) => {
                if (current_group.id == this_card.id_group) {
                  current_group.cards.push({
                    id: this_card.id_card,
                    id_group: this_card.id_group,
                    name: this_card.name,
                    description: this_card.description,
                    style: this_card.style,
                    laneId: this_card.id_swinlane,
                    id_user: this_card.id_user,
                  });
                }
              });
            });
          });
        }
      }
    }

    // list all tags from this board
    const all_tags = await TagsService.getTagsByBoardId(board_id);

    if (all_tags) {
      all_tags.map((this_tag) => {
        base_json.tags.push({
          id: this_tag.id_tag,
          name: this_tag.name,
          style: this_tag.style,
        });
      });
    }

    // list all swinlanes from this board
    const all_swinlanes = await SwinlaneService.getSwinlanesByBoardId(board_id);

    if (all_swinlanes) {
      all_swinlanes.map((this_swinlane) => {
        base_json.swinlanes.push({
          id: this_swinlane.id_swinlane,
          name: this_swinlane.name,
          style: this_swinlane.style,
        });
      });
    }

    json.result = base_json;

    res.json(json);
  },

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

  getBoardParticipants: async (req, res) => {
    let json = { error: "", result: {} };

    let id_board = req.params.board_id;

    if (id_board) {
      const response = await BoardService.getBoardParticipants(id_board);

      if (response) {
        json.result = response;
      } else {
        json.error = "Board has no participants or an error happened";
      }
    } else {
      json.error = "Missing id_board on params.";
    }

    res.json(json);
  },
};
