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
};
