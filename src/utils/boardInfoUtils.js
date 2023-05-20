const CardService = require("../services/CardService.js");

const checkIfPropertyExists = (arr, property, value) => {
  return arr.some(function (obj) {
    return obj[property] === value;
  });
};

const mountColumnGroupsCardsObject = async (
  columns_and_groups,
  all_cards_tags,
  all_group_cards
) => {
  let result = {
    columns: [],
    nextColumnId: 0,
    nextGroupId: 0,
  };

  columns_and_groups.map((column_and_group) => {
    //destructuring column_and_group
    const { id_column, column_name, id_group, group_name } = column_and_group;

    // check if column is already created on array
    if (checkIfPropertyExists(result.columns, "id", id_column)) {
      // find the created column
      result.columns.map((column) => {
        if (column.id == id_column) {
          let cards = [];

          if (all_group_cards) {
            all_group_cards.map((card) => {
              if (card.id_group == id_group) {
                cards.push(card);
              }
            });

            cards = JSON.parse(JSON.stringify(cards));

            if (all_cards_tags) {
              cards.map((card) => {
                const found = all_cards_tags.find(
                  (card_tag) => card_tag.id_card == card.id
                );

                if (found) {
                  card.tags = JSON.parse(found.tags);
                }
              });
            }
          }

          column.groups.push({ id: id_group, name: group_name, cards: cards });
          result.nextGroupId++;
        }
      });
    } else {
      let cards = [];

      if (all_group_cards) {
        all_group_cards.map((card) => {
          if (card.id_group == id_group) {
            cards.push(card);
          }
        });

        cards = JSON.parse(JSON.stringify(cards));

        if (all_cards_tags) {
          cards.map((card) => {
            const found = all_cards_tags.find(
              (card_tag) => card_tag.id_card == card.id
            );

            if (found) {
              card.tags = JSON.parse(found.tags);
            }
          });
        }
      }

      result.columns.push({
        id: id_column,
        name: column_name,
        groups: [{ id: id_group, name: group_name, cards: cards }],
      });

      result.nextColumnId++;
      result.nextGroupId++;
    }
  });

  return result;
};

module.exports = {
  checkIfPropertyExists,
  mountColumnGroupsCardsObject,
};
