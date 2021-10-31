import { IContext } from "../context";

interface CreateCardInput {
  title: string;
  content?: string;
}

interface UpdateCardInput {
  title?: string;
  content?: string;
}

const Mutation = {
  async createCard(
    parent: any,
    args: { data: CreateCardInput },
    context: IContext,
    info: any
  ) {
    const { data } = args;
    const { pubsub, prisma } = context;

    const card = await prisma.card.create({ data });
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
  async updateCard(
    parent: any,
    args: { id: string; data: UpdateCardInput },
    context: IContext,
    info: any
  ) {
    const { id, data } = args;
    const { pubsub, prisma } = context;

    let card;
    try {
      card = await prisma.card.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (e) {
      return {
        code: "400",
        success: false,
        message: "Card not found",
        card: null,
      };
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
  async deleteCard(
    parent: any,
    args: { id: string },
    context: IContext,
    info: any
  ) {
    const { id } = args;
    const { pubsub, prisma } = context;

    let card;
    try {
      card = await prisma.card.delete({ where: { id: parseInt(id) } });
    } catch (e) {
      return {
        code: "400",
        success: false,
        message: "Card not found",
        card: null,
      };
    }

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
