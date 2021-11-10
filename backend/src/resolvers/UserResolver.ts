import "reflect-metadata";
import { Ctx, Resolver, Query, Authorized } from "type-graphql";
import { User } from "@generated/type-graphql";
import { Context } from "../interfaces/context";

@Resolver(User)
class UserResolver {
  @Authorized()
  @Query((returns) => [User])
  async users(@Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.user.findMany();
  }
}

export default UserResolver;
