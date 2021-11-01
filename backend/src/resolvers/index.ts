import { FindManyCardResolver } from "@generated/type-graphql";
import CardResolver from "./CardResolver";

export const resolvers = [CardResolver, FindManyCardResolver] as const;
