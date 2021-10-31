import { PubSub } from "graphql-subscriptions";
import db from "./db";

const pubsub = new PubSub();

export interface IContext {
  pubsub: PubSub;
  db: typeof db;
}

export const context: IContext = { db, pubsub };
