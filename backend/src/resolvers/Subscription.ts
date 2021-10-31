import { IContext } from "../context";

const Subscription = {
  card: {
    subscribe(parent: any, args: any, context: IContext, info: any) {
      const { pubsub } = context;
      return pubsub.asyncIterator(["CARD"]);
    },
  },
};

export default Subscription;
