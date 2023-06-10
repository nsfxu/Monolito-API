const TagsService = require("../services/TagsService.js");

module.exports = {
  createGroup: async (req, res) => {
    let json = { error: "", result: {} };

    let groupObj = {
      id_column: req.body.id_column,
      name: req.body.name,
    };

    if (groupObj.name && groupObj.id_column) {
      const group_order = await GroupService.getLastOrderByColumnId(
        groupObj.id_column
      );

      groupObj.group_order = group_order + 1;

      const group_response = await GroupService.createGroup({
        order: groupObj.group_order,
        name: groupObj.name,
      });

      if (group_response) {
        groupObj.id_group = group_response.insertId;

        await GroupService.linkGroupWithBoardId(
          groupObj.id_column,
          group_response.insertId
        );

        json.result = groupObj;
      } else {
        json.error = "Wrong card parameters";
      }
    } else {
      json.error = "Wrong card parameters";
    }

    res.json(json);
  },

  deleteGroup: async (req, res) => {
    let json = { error: "", result: {} };

    const id_group = req.params.id_group;

    if (id_group) {
      const group_result = await GroupService.deleteGroup(id_group);
      const link_result = await GroupService.deleteGroupLinks(id_group);

      if (group_result > 0 && link_result > 0) json.result = "Group deleted.";
      else json.result = "Group id does not exists.";
    } else {
      json.error = "Invalid group id";
    }

    res.json(json);
  },

  updateGroup: async (req, res) => {
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

    console.log(columnObj);

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
