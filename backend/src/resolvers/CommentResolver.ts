import "reflect-metadata";
import {
  Ctx,
  Mutation,
  Int,
  Resolver,
  Arg,
  InputType,
  Field,
  Query,
  Authorized,
} from "type-graphql";
import { Comment } from "@generated/type-graphql";
import { Context } from "../interfaces/context";

@InputType()
class CreateCommentInput implements Partial<Comment> {
  @Field()
  content: string;

  @Field()
  taskId: number;
}

@InputType()
class UpdateCommentInput implements Partial<Comment> {
  @Field({ nullable: true })
  content?: string;
}

@Resolver(Comment)
class CommentResolver {
  @Query((returns) => [Comment])
  async comments(@Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.comment.findMany();
  }

  @Query((returns) => Comment)
  async comment(@Arg("id", (type) => Int) id: number, @Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.comment.findUnique({ where: { id } });
  }

  @Authorized()
  @Mutation((returns) => Comment)
  async createComment(
    @Arg("data") data: CreateCommentInput,
    @Ctx() context: Context
  ) {
    const { prisma, user } = context;

    if (!user?.client_id) {
      throw new Error(`Cannot create task before login`);
    }

    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        taskId: data.taskId,
        authorId: user.client_id,
      },
    });
    return comment;
  }

  @Authorized()
  @Mutation((returns) => Comment)
  async updateComment(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateCommentInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const comment = await prisma.comment.update({
      where: { id },
      data: {
        content: data.content,
      },
    });
    return comment;
  }

  @Authorized()
  @Mutation((returns) => Comment)
  async deleteComment(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const comment = await prisma.comment.delete({ where: { id } });
    return comment;
  }
}

export default CommentResolver;
