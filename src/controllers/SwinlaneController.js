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

    let swinlaneObj = {
      id_swinlane: req.params.id_swinlane,
      name: req.body.name,
      style: req.body.style,
    };

    if (swinlaneObj.id_swinlane) {
      const response = await SwinlaneService.updateSwinlane(swinlaneObj);

      if (response) {
        json.result = swinlaneObj;
      } else {
        json.error = "Wrong swinlane parameters";
      }
    } else {
      json.error = "Wrong swinlane parameters";
    }

    res.json(json);
  },

  updateOrder: async (req, res) => {
    let json = { error: "", result: {} };

    let swinlaneObj = {
      id_board: req.params.id_board,
      swinlanes: req.body.swinlanes,
    };

    if (swinlaneObj.id_board && swinlaneObj.swinlanes) {
      swinlaneObj.swinlanes.map(async (swinlane, index) => {
        await SwinlaneService.updateSwinlaneOrder(swinlane.id, index);
      });

      json.result = swinlaneObj;
    } else {
      json.error = "Wrong swinlane parameters";
    }

    res.json(json);
  },
};
