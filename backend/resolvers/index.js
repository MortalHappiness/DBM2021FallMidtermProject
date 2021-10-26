const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
  Subscription: {
    numberIncremented: {
      subscribe: (parent, args, context, info) => {
        return context.pubsub.asyncIterator(["NUMBER_INCREMENTED"]);
      },
    },
  },
};

module.exports = resolvers;
