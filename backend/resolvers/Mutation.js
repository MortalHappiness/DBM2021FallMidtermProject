const Mutation = {
  createCard(parent, args, context, info) {
    const { data: card } = args;
    const { pubsub, db } = context;

    card.id = db.cards.length;
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
};

module.exports = Mutation;
