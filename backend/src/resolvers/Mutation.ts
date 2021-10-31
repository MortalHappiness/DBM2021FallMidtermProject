import { IContext } from "../context";

const Mutation = {
  createCard(parent: any, args: any, context: IContext, info: any) {
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
  updateCard(parent: any, args: any, context: IContext, info: any) {
    const { id, data } = args;
    const { pubsub, db } = context;

    const card = db.cards.find((card: { id: any }) => card.id === id);

    if (!card) {
      return {
        code: "400",
        success: false,
        message: "Card not found",
        card: null,
      };
    }

    if (data.title) {
      card.title = data.title;
    }
    if (data.content) {
      card.content = data.content;
    }

    pubsub.publish("CARD", {
      card: {
        mutation: "UPDATED",
        data: card,
      },
    });
    return {
      code: "200",
      success: true,
      message: "Card was successfully updated",
      card,
    };
  },
  deleteCard(parent: any, args: any, context: IContext, info: any) {
    const { id } = args;
    const { pubsub, db } = context;

    const idx = db.cards.findIndex((card: { id: any }) => card.id === id);
    if (idx === -1) {
      return {
        code: "400",
        success: false,
        message: "Card not found",
        card: null,
      };
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

export default Mutation;
