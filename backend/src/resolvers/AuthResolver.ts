import "reflect-metadata";
import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import { Ctx, Resolver, Mutation, Arg } from "type-graphql";
import { Context } from "../interfaces/context";

@Resolver()
class AuthResolver {
  @Mutation((returns) => String)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() context: Context
  ) {
    const { prisma, secret } = context;
    const user = await prisma.user.findUnique({ where: { username } });
    if (user === null) {
      throw new Error("Username not found");
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new Error("Incorrect password");
    }
    return jwt.sign({ client_id: user.id }, secret, {
      algorithm: "HS256",
      subject: user.id.toString(),
      expiresIn: "1h",
    });
  }

  @Mutation((returns) => String)
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() context: Context
  ) {
    const { prisma } = context;
    const user = await prisma.user.findUnique({ where: { username } });
    if (user !== null) {
      throw new Error("Username has already exists");
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    await prisma.user.create({
      data: { username, passwordHash, displayName: username },
    });
    return username;
  }
}

export default AuthResolver;
