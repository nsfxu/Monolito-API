const CardService = require("../services/CardService.js");

module.exports = {
  updateCardGroup: async (req, res) => {
    let json = { error: "", result: {} };

    let cardObj = {
      id_card: req.params.id_card,
      new_order: req.body.new_order,
      old_order: req.body.old_order,
      id_group: req.body.id_group,
      id_swinlane: req.body.id_swinlane,
    };

    if (cardObj.id_card && cardObj.id_group) {
      let set = "";
      let where = "";

      if (cardObj.old_order < cardObj.new_order) {
        set = "c.order = c.order - 1";
        where = `id_group = ${cardObj.id_group} and c.order > ${cardObj.old_order} and c.order <= ${cardObj.new_order}`;
      } else {
        set = "c.order = c.order + 1";
        where = `id_group = ${cardObj.id_group} and c.order < ${cardObj.old_order} and c.order >= ${cardObj.new_order}`;
      }

      await CardService.updateCardsOrder(set, where);

      const card_update_response = await CardService.updateCardGroup(cardObj);

      if (card_update_response) {
        json.result = "Card updated!";
      } else {
        json.error = "Wrong card parameters";
      }
    } else {
      json.error = "Wrong card parameterse";
    }

    res.json(json);
  },

  createCard: async (req, res) => {
    let json = { error: "", result: {} };

    let cardObj = {
      name: req.body.name,
      description: req.body.description,
      style: req.body.style,
      id_group: req.body.id_group,
      id_swinlane: req.body.id_swinlane,
      id_user: req.body.id_user,
    };

    if (cardObj.name && cardObj.id_group && cardObj.id_user) {
      await CardService.updateCardsOrder("c.order = c.order + 1", `id_group = ${cardObj.id_group} and c.order >= 0`);

      const response = await CardService.createCard(cardObj);


      if (response) {
        json.response = cardObj;
      } else {
        json.error = "Wrong card parameters";
      }
    } else {
      json.error = "Wrong card parameterse";
    }

    res.json(json);
  },
};
