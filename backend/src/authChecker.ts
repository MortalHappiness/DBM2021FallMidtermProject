import { AuthChecker } from "type-graphql";
import { Context } from "./interfaces/context";

export const authChecker: AuthChecker<Context> = ({ context: { user } }) => {
  return user !== undefined;
};
