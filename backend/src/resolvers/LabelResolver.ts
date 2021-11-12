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
} from "type-graphql";
import { Label } from "@generated/type-graphql";
import { Context } from "../interfaces/context";
import MutationType from "./MutationType";
import SubscriptionPayload from "./SubscriptionPayload";

@InputType()
class CreateLabelInput implements Partial<Label> {
  @Field()
  name: string;

  @Field()
  color?: string;

  @Field()
  projectId: number;
}

@InputType()
class UpdateLabelInput implements Partial<Label> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  color?: string;
}

@ObjectType({ implements: SubscriptionPayload })
class LabelSubscriptionPayload extends SubscriptionPayload {
  @Field((type) => Label)
  label: Label;
}

@Resolver(Label)
class LabelResolver {
  @Query((returns) => [Label])
  async labels(@Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.label.findMany();
  }

  @Query((returns) => Label)
  async label(@Arg("id", (type) => Int) id: number, @Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.label.findUnique({ where: { id } });
  }

  @Mutation((returns) => Label)
  async createLabel(
    @Arg("data") data: CreateLabelInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    if (data.color === undefined) {
      data.color = "blue";
    }

    const label = await prisma.label.create({
      data: {
        name: data.name,
        color: data.color,
        projectId: data.projectId,
      },
    });
    pubsub.publish("LABEL", {
      mutationType: MutationType.CREATED,
      label,
    });
    return label;
  }

  @Mutation((returns) => Label)
  async updateLabel(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateLabelInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const label = await prisma.label.update({
      where: { id },
      data: {
        name: data.name,
        color: data.color,
      },
    });

    pubsub.publish("LABEL", {
      mutationType: MutationType.UPDATED,
      label,
    });
    return label;
  }

  @Mutation((returns) => Label)
  async deleteLabel(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const label = await prisma.label.delete({ where: { id } });

    pubsub.publish("LABEL", {
      mutationType: MutationType.DELETED,
      label,
    });
    return label;
  }

  @Subscription({ topics: "LABEL" })
  labelSubscription(
    @Root() labelSubscriptionPayload: LabelSubscriptionPayload
  ): LabelSubscriptionPayload {
    return labelSubscriptionPayload;
  }
}

export default LabelResolver;
