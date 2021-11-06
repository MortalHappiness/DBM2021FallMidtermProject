import { FindManyTaskResolver } from "@generated/type-graphql";
import TaskResolver from "./TaskResolver";

export const resolvers = [TaskResolver, FindManyTaskResolver] as const;
