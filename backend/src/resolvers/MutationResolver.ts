import "reflect-metadata";
import jwt = require("jsonwebtoken");
import { Ctx, Resolver, Mutation, Arg } from "type-graphql";
import { Context } from "../interfaces/context";

@Resolver()
class MutationResolver {
  @Mutation((returns) => String)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: String,
    @Ctx() context: Context
  ) {
    const { prisma, secret } = context;
    const user = await prisma.user.findUnique({ where: { username } });
    if (user === null) {
      throw new Error("Username not found");
    }
    if (user.passwordHash !== password) {
      throw new Error("Incorrect password");
    }
    return jwt.sign({ client_id: user.id }, secret, {
      algorithm: "HS256",
      subject: user.id.toString(),
      expiresIn: "1h",
    });
  }
}

export default MutationResolver;
