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

    console.log(cardObj);

    if (cardObj.id_card && cardObj.id_group) {
      let set = "";
      let where = "";

      if (cardObj.old_order < cardObj.new_order) {
        set = "c.order = c.order - 1";
        where = `c.order > ${cardObj.old_order} and c.order <= ${cardObj.new_order}`;
      } else {
        set = "c.order = c.order + 1";
        where = `c.order < ${cardObj.old_order} and c.order >= ${cardObj.new_order}`;
      }

      const card_order_response = await CardService.updateCardsOrder(
        set,
        where
      );
      const card_update_response = await CardService.updateCardGroup(cardObj);

      console.log(card_order_response);
      console.log(card_update_response);

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
};
