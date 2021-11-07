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
import { Comment } from "@generated/type-graphql";
import { Context } from "../context";
import MutationType from "./MutationType";
import SubscriptionPayload from "./SubscriptionPayload";

@InputType()
class CreateCommentInput implements Partial<Comment> {
  @Field()
  content: string;

  @Field()
  taskId: number;

  @Field()
  authorId: number;
}

@InputType()
class UpdateCommentInput implements Partial<Comment> {
  @Field({ nullable: true })
  content?: string;
}

@ObjectType({ implements: SubscriptionPayload })
class CommentSubscriptionPayload extends SubscriptionPayload {
  @Field((type) => Comment)
  comment: Comment;
}

@Resolver(Comment)
class CommentResolver {
  @Mutation((returns) => Comment)
  async createComment(
    @Arg("data") data: CreateCommentInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        taskId: data.taskId,
        authorId: data.authorId,
      },
    });
    pubsub.publish("COMMENT", {
      mutationType: MutationType.CREATED,
      comment,
    });
    return comment;
  }

  @Mutation((returns) => Comment)
  async updateComment(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateCommentInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const comment = await prisma.comment.update({
      where: { id },
      data: {
        content: data.content,
      },
    });

    pubsub.publish("COMMENT", {
      mutationType: MutationType.UPDATED,
      comment,
    });
    return comment;
  }

  @Mutation((returns) => Comment)
  async deleteComment(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const comment = await prisma.comment.delete({ where: { id } });

    pubsub.publish("COMMENT", {
      mutationType: MutationType.DELETED,
      comment,
    });
    return comment;
  }

  @Subscription({ topics: "COMMENT" })
  commentSubscription(
    @Root() commentSubscriptionPayload: CommentSubscriptionPayload
  ): CommentSubscriptionPayload {
    return commentSubscriptionPayload;
  }
}

export default CommentResolver;
