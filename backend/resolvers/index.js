const db = require("./db");

const resolvers = {
  Query: {
    cards: () => db.cards,
  },
  Mutation: {
    createCard(parent, args, context, info) {
      const { data: card } = args;
      const { pubsub } = context;

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
  },
  Subscription: {
    card: {
      subscribe(parent, args, context, info) {
        const { pubsub } = context;
        return pubsub.asyncIterator(["CARD"]);
      },
    },
  },
};

module.exports = resolvers;
