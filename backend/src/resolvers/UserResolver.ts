import "reflect-metadata";
import { Ctx, Resolver, Query, Authorized, Mutation, Arg, Int } from "type-graphql";
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

  @Authorized()
  @Mutation((returns) => User)
  async joinOrganization(
    @Arg("organizationId", (type) => Int) organizationId: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const user = await prisma.user.update({
      where: { id: context.user?.client_id },
      data: {
        organizations: {
          connect: { id: organizationId }
        },
      },
    });

    return user;
  }

  @Authorized()
  @Mutation((returns) => User)
  async leaveOrganization(
    @Arg("organizationId", (type) => Int) organizationId: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const user = await prisma.user.update({
      where: { id: context.user?.client_id },
      data: {
        organizations: {
          disconnect: { id: organizationId }
        },
      },
    });

    return user;
  }
}

export default UserResolver;
