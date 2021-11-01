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
} from "type-graphql";
import { Card } from "@generated/type-graphql";
import { Context } from "../context";
import MutationType from "./MutationType";
import SubscriptionPayload from "./SubscriptionPayload";

@InputType()
class CreateCardInput implements Partial<Card> {
  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;
}

@InputType()
class UpdateCardInput implements Partial<Card> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;
}

@ObjectType({ implements: SubscriptionPayload })
class CardSubscriptionPayload extends SubscriptionPayload {
  @Field((type) => Card)
  card: Card;
}

@Resolver(Card)
class CardResolver {
  @Mutation((returns) => Card)
  async createCard(
    @Arg("data") data: CreateCardInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const card = await prisma.card.create({
      data: {
        title: data.title,
        content: data.content !== null ? data.content : undefined,
      },
    });
    pubsub.publish("CARD", {
      mutationType: MutationType.CREATED,
      card,
    });
    return card;
  }

  @Mutation((returns) => Card)
  async updateCard(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateCardInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const card = await prisma.card.update({
      where: { id },
      data: {
        title: data.title !== null ? data.title : undefined,
        content: data.content !== null ? data.content : undefined,
      },
    });

    pubsub.publish("CARD", {
      mutationType: MutationType.UPDATED,
      card,
    });
    return card;
  }

  @Mutation((returns) => Card)
  async deleteCard(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const card = await prisma.card.delete({ where: { id } });

    pubsub.publish("CARD", {
      mutationType: MutationType.DELETED,
      card,
    });
    return card;
  }

  @Subscription({ topics: "CARD" })
  cardSubscription(
    @Root() cardSubscriptionPayload: CardSubscriptionPayload
  ): CardSubscriptionPayload {
    return cardSubscriptionPayload;
  }
}

export default CardResolver;
