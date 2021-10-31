import { IContext } from "../context";

const Query = {
  cards(parent: any, args: any, context: IContext, info: any) {
    const { db } = context;
    return db.cards;
  },
};

export default Query;
