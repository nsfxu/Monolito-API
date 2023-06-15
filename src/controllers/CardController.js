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
      id_card: req.body.id_card,
      name: req.body.name,
      description: req.body.description,
      expectedDate: req.body.expectedDate,
      style: req.body.style,
      id_group: req.body.id_group,
      id_swinlane: req.body.id_swinlane,
      id_user: req.body.id_user,
    };

    if (cardObj.name && cardObj.id_group) {
      await CardService.updateCardsOrder(
        "c.order = c.order + 1",
        `id_group = ${cardObj.id_group} and c.order >= 0`
      );

      const response = await CardService.createCard(cardObj);

      if (response) {
        cardObj.id_card = response.insertId;
        json.result = cardObj;
      } else {
        json.error = "Wrong card parameters";
      }
    } else {
      json.error = "Wrong card parameters";
    }

    res.json(json);
  },

  updateCard: async (req, res) => {
    let json = { error: "", result: {} };

    let cardObj = {
      id_card: req.params.id_card,
      name: req.body.name,
      description: req.body.description,
      expectedDate: req.body.expectedDate,
      id_user: req.body.id_user,
      id_group: req.body.id_group,
      id_swinlane: req.body.id_swinlane,
      style: req.body.style,
    };

    if (
      cardObj.id_card &&
      cardObj.name &&
      cardObj.id_user &&
      cardObj.id_group
    ) {
      cardObj.style = cardObj.style ? cardObj.style : null;
      cardObj.description = cardObj.description ? cardObj.description : null;

      const card_result = await CardService.updateCard(cardObj);

      if (card_result) {
        json.result = cardObj;
      } else {
        json.error = "Wrong card parameters";
      }
    } else {
      json.error = "Wrong card parameters";
    }

    res.json(json);
  },

  updateCardExpectedDate: async (req, res) => {
    let json = { error: "", result: {} };

    let cardObj = {
      id_card: req.params.id_card,
      expectedDate: req.body.expectedDate,
    };

    if (cardObj.id_card) {
      const card_result = await CardService.updateCardExpectedDate(cardObj);

      if (card_result) {
        json.result = cardObj;
      } else {
        json.error = "Wrong card parameters";
      }
    } else {
      json.error = "Wrong card parameters";
    }

    res.json(json);
  },

  deleteCard: async (req, res) => {
    let json = { error: "", result: {} };

    const id_card = req.params.id_card;

    if (id_card) {
      const card_result = await CardService.deleteCard(id_card);

      if (card_result > 0) json.result = "Card deleted.";
      else json.result = "Card id does not exists.";
    } else {
      json.error = "Invalid card id";
    }

    res.json(json);
  },
};
