const Subscription = {
  card: {
    subscribe(parent, args, context, info) {
      const { pubsub } = context;
      return pubsub.asyncIterator(["CARD"]);
    },
  },
};

module.exports = Subscription;
