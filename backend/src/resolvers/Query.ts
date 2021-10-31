import { IContext } from "../context";

const Query = {
  async cards(parent: any, args: any, context: IContext, info: any) {
    const { prisma } = context;
    return await prisma.card.findMany();
  },
};

export default Query;
