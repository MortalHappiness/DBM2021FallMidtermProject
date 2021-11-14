import "reflect-metadata";
import { Ctx, Resolver, Query, Authorized } from "type-graphql";
import { User } from "@generated/type-graphql";
import { Context } from "../interfaces/context";

@Resolver(User)
class UserResolver {
  @Authorized()
  @Query((returns) => User)
  async me(@Ctx() context: Context) {
    const { prisma, user } = context;
    return await prisma.user.findUnique({ where: { id: user?.client_id } });
  }
}

export default UserResolver;
