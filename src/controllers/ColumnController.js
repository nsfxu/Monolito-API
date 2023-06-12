const ColumnService = require("../services/ColumnService.js");
const GroupService = require("../services/GroupService.js");

module.exports = {
  createColumn: async (req, res) => {
    let json = { error: "", result: {} };

    let columnObj = {
      name: req.body.name,
      id_board: req.body.id_board,
    };

    if (columnObj.name && columnObj.id_board) {
      const column_order = await ColumnService.getColumnCountByBoardId(
        columnObj.id_board
      );

      columnObj.column_order = column_order + 1;

      const column_response = await ColumnService.createColumn(columnObj);

      if (column_response) {
        columnObj.id_column = column_response.insertId;

        const group_response = await GroupService.createGroup({
          order: 0,
          name: "Doing",
        });

        columnObj.id_group = group_response.insertId;

        await GroupService.linkGroupWithBoardId(
          columnObj.id_column,
          group_response.insertId
        );

        json.result = columnObj;
      } else {
        json.error = "Wrong card parameters";
      }
    } else {
      json.error = "Wrong card parameters";
    }

    res.json(json);
  },

  updateColumn: async (req, res) => {
    let json = { error: "", result: {} };

    let columnObj = {
      id_column: req.params.id_column,
      name: req.body.name,
      show_swinlane: req.body.show_swinlane,
      show_wip: req.body.show_wip,
      wip_limit: req.body.wip_limit,
    };

    if (columnObj.id_column) {
      const response = await ColumnService.updateColumnInfo(columnObj);

      if (response) {
        json.result = columnObj;
      } else {
        json.error = "Wrong card parameters";
      }
    } else {
      json.error = "Wrong card parameters";
    }

    res.json(json);
  },

  deleteColumn: async (req, res) => {
    let json = { error: "", result: {} };

    const id_column = req.params.id_column;

    if (id_column) {
      const column_result = await ColumnService.deleteColumn(id_column);
      const link_result = await ColumnService.deleteColumnLinks(id_column);

      if (column_result > 0 && link_result > 0) json.result = "Column deleted.";
      else json.result = "Column id does not exists.";
    } else {
      json.error = "Invalid column id";
    }

    res.json(json);
  },

  updateOrder: async (req, res) => {
    let json = { error: "", result: {} };

    let columnObj = {
      id_board: req.params.id_board,
      columns: req.body.columns,
    };

    if (columnObj.id_board && columnObj.columns) {
      columnObj.columns.map(async (column, index) => {
        await ColumnService.updateColumnOrder(column.id, index);
      });

      json.result = columnObj;
    } else {
      json.error = "Wrong card parameters";
    }

    res.json(json);
  },
};
