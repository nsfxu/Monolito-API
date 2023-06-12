const SwinlaneService = require("../services/SwinlaneService.js");

module.exports = {
  createSwinlane: async (req, res) => {
    let json = { error: "", result: {} };

    const swinlaneObj = {
      id_board: req.body.id_board,
      name: req.body.name,
      style: req.body.style,
    };

    if (swinlaneObj.name && swinlaneObj.id_board) {
      const swinlane_order = await SwinlaneService.getLastOrderByBoardId(
        swinlaneObj.id_board
      );

      swinlaneObj.swinlane_order = swinlane_order + 1;

      const swinlane_response = await SwinlaneService.createSwinlane({
        order: swinlaneObj.swinlane_order,
        name: swinlaneObj.name,
        style: swinlaneObj.style ? swinlaneObj.style : null,
        id_board: swinlaneObj.id_board,
      });

      if (swinlane_response) {
        swinlaneObj.id_swinlane = swinlane_response.insertId;

        json.result = swinlaneObj;
      } else {
        json.error = "Wrong swinlane parameters";
      }
    } else {
      json.error = "Wrong swinlane parameters";
    }

    res.json(json);
  },

  deleteSwinlane: async (req, res) => {
    let json = { error: "", result: {} };

    const id_swinlane = req.params.id_swinlane;

    if (id_swinlane) {
      const swinlane_result = await SwinlaneService.deleteSwinlane(id_swinlane);

      if (swinlane_result > 0) json.result = "Swinlane deleted.";
      else json.result = "Swinlane id does not exists.";
    } else {
      json.error = "Invalid swinlane id";
    }

    res.json(json);
  },

  updateSwinlane: async (req, res) => {
    let json = { error: "", result: {} };

    let groupObj = {
      id_group: req.params.id_group,
      name: req.body.name,
      // show_wip: req.body.show_wip ? req.body.show_wip : false,
      // wip_limit: req.body.wip_limit ? req.body.wip_limit : null,
    };

    if (groupObj.id_group) {
      const response = await GroupService.updateGroupInfo(groupObj);

      if (response) {
        json.result = groupObj;
      } else {
        json.error = "Wrong group parameters";
      }
    } else {
      json.error = "Wrong group parameters";
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
