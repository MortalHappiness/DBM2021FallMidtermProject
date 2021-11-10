import CommentResolver from "./CommentResolver";
import OrganizationResolver from "./OrganizationResolver";
import ProjectResolver from "./ProjectResolver";
import TaskResolver from "./TaskResolver";
import UserResolver from "./UserResolver";
import MutationResolver from "./MutationResolver";

export const resolvers = [
  CommentResolver,
  OrganizationResolver,
  ProjectResolver,
  TaskResolver,
  UserResolver,
  MutationResolver,
] as const;
