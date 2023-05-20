const CardService = require("../services/CardService.js");

module.exports = {
  updateCardGroup: async (req, res) => {
    let json = { error: "", result: {} };

    let cardObj = {
      id_card: req.params.id_card,
      order: req.body.order,
      id_group: req.body.id_group,
      id_swinlane: req.body.id_swinlane
    };

    if (cardObj.id_card && cardObj.id_group && cardObj.order) {
      const response = await CardService.updateCardGroup(cardObj);

      if (response) {
        json.result = "Card updated!";
      } else {
        json.error("Wrong card parameters");
      }
    } else {
      json.error("Wrong card parameters");
    }

    res.json(json);
  },
};
