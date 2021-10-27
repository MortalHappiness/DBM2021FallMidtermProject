const Query = {
  cards(parent, args, context, info) {
    const { db } = context;
    return db.cards;
  },
};

module.exports = Query;
