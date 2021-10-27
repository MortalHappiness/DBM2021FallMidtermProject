const Mutation = {
  createCard(parent, args, context, info) {
    const { data: card } = args;
    const { pubsub, db } = context;

    card.id = (parseInt(db.cards[db.cards.length - 1].id) + 1).toString();
    db.cards.push(card);
    pubsub.publish("CARD", {
      card: {
        mutation: "CREATED",
        data: card,
      },
    });
    return {
      code: "200",
      success: true,
      message: "Card was successfully created",
      card,
    };
  },
  deleteCard(parent, args, context, info) {
    const { id } = args;
    const { pubsub, db } = context;

    const idx = db.cards.findIndex((card) => card.id === id);
    if (idx === -1) {
      throw new Error("Card not found");
    }
    const [card] = db.cards.splice(idx, 1);

    pubsub.publish("CARD", {
      card: {
        mutation: "DELETED",
        data: card,
      },
    });
    return {
      code: "200",
      success: true,
      message: "Card was successfully deleted",
      card,
    };
  },
};

module.exports = Mutation;
