import { FindManyTaskResolver } from "@generated/type-graphql";
import CommentResolver from './CommentResolver';
import OrganizationResolver from './OrganizationResolver';
import ProjectResolver from './ProjectResolver';
import TaskResolver from "./TaskResolver";
import UserResolver from './UserResolver';

export const resolvers = [
  CommentResolver,
  OrganizationResolver,
  ProjectResolver,
  TaskResolver,
  FindManyTaskResolver,
  UserResolver
] as const;
