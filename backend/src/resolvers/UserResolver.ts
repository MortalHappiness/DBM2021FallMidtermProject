import "reflect-metadata";
import { PubSubEngine } from "graphql-subscriptions";
import {
  Ctx,
  Mutation,
  Int,
  Resolver,
  Arg,
  InputType,
  Field,
  Subscription,
  Root,
  ObjectType,
  PubSub,
  Query,
  Authorized,
} from "type-graphql";
import { User } from "@generated/type-graphql";
import { Context } from "../interfaces/context";
import MutationType from "./MutationType";
import SubscriptionPayload from "./SubscriptionPayload";
import { hashPassword } from "../password";

@InputType()
class CreateUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  displayName: string;

  @Field()
  password: string;
}

@InputType()
class UpdateUserInput implements Partial<User> {
  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  password?: string;
}

@ObjectType({ implements: SubscriptionPayload })
class UserSubscriptionPayload extends SubscriptionPayload {
  @Field((type) => User)
  user: User;
}

@Resolver(User)
class UserResolver {
  @Authorized()
  @Query((returns) => [User])
  async users(@Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.user.findMany();
  }

  @Mutation((returns) => User)
  async createUser(
    @Arg("data") data: CreateUserInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const passwordHash: string = hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        displayName: data.displayName,
        username: data.username,
        passwordHash,
      },
    });
    pubsub.publish("USER", {
      mutationType: MutationType.CREATED,
      user,
    });
    return user;
  }

  @Mutation((returns) => User)
  async updateUser(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateUserInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const user = await prisma.user.update({
      where: { id },
      data: {
        displayName: data.displayName,
        passwordHash: data.password ? hashPassword(data.password) : undefined,
      },
    });

    pubsub.publish("USER", {
      mutationType: MutationType.UPDATED,
      user,
    });
    return user;
  }

  @Mutation((returns) => User)
  async deleteUser(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const user = await prisma.user.delete({ where: { id } });

    pubsub.publish("USER", {
      mutationType: MutationType.DELETED,
      user,
    });
    return user;
  }

  @Subscription({ topics: "USER" })
  userSubscription(
    @Root() userSubscriptionPayload: UserSubscriptionPayload
  ): UserSubscriptionPayload {
    return userSubscriptionPayload;
  }
}

export default UserResolver;
