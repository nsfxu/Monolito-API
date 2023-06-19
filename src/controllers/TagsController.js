const TagsService = require("../services/TagsService.js");

module.exports = {
  updateCardTags: async (req, res) => {
    let json = { error: "", result: {} };

    const tagObj = {
      id_card: req.params.id_card,
      all_tags_ids: req.body.all_tags_ids,
    };

    if (tagObj.id_card && tagObj.all_tags_ids) {
      if (tagObj.all_tags_ids.length > 0) {
        await TagsService.deleteAllLinksByCardId(tagObj.id_card);

        let values_query = "";

        tagObj.all_tags_ids.map((id_tag) => {
          values_query += `(${tagObj.id_card}, ${id_tag}),`;
        });

        values_query = values_query.substring(0, values_query.length - 1);

        const response = await TagsService.assignTagsToCard(values_query);

        if (response.affectedRows > 0) {
          json.result = tagObj;
        }
      }

      json.result = tagObj;
    } else {
      json.error = "Wrong tag parameters.";
    }

    res.json(json);
  },

  createTag: async (req, res) => {
    let json = { error: "", result: {} };

    const tagObj = {
      id_board: req.body.id_board,
      name: req.body.name,
      style: req.body.style,
    };

    if (tagObj.name && tagObj.id_board) {
      const response = await TagsService.createTag(tagObj);

      if (response) {
        tagObj.id = response.insertId;

        json.result = tagObj;
      } else {
        json.error = "Wrong tag parameters";
      }
    } else {
      json.error = "Wrong tag parameters";
    }

    res.json(json);
  },

  updateTag: async (req, res) => {
    let json = { error: "", result: {} };

    let tagObj = {
      id_tag: req.params.id_tag,
      name: req.body.name,
      style: req.body.style,
    };

    if (tagObj.id_tag) {
      const response = await TagsService.updateTag(tagObj);

      if (response) {
        json.result = tagObj;
      } else {
        json.error = "Wrong tag parameters";
      }
    } else {
      json.error = "Wrong tag parameters";
    }

    res.json(json);
  },

  deleteTag: async (req, res) => {
    let json = { error: "", result: {} };

    const id_tag = req.params.id_tag;

    if (id_tag) {
      const tag_result = await TagsService.deleteTag(id_tag);

      if (tag_result > 0) {
        json.result = "Tag deleted.";
      } else json.result = "Tag id does not exists.";
    } else {
      json.error = "Invalid tag id";
    }

    res.json(json);
  },
};
