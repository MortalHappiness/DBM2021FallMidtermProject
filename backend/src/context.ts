import { PubSub } from "graphql-subscriptions";
import { PrismaClient } from "@prisma/client";

const pubsub = new PubSub();
const prisma = new PrismaClient();

export interface IContext {
  pubsub: PubSub;
  prisma: PrismaClient;
}

export const context: IContext = { pubsub, prisma };
