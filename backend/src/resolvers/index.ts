import AuthResolver from "./AuthResolver";
import CommentResolver from "./CommentResolver";
import LabelResolver from "./LabelResolver";
import OrganizationResolver from "./OrganizationResolver";
import ProjectResolver from "./ProjectResolver";
import TaskResolver from "./TaskResolver";
import UserResolver from "./UserResolver";

import { relationResolvers } from "@generated/type-graphql";

export const resolvers = [
  ...relationResolvers,
  AuthResolver,
  CommentResolver,
  LabelResolver,
  OrganizationResolver,
  ProjectResolver,
  TaskResolver,
  UserResolver,
] as const;
