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
} from "type-graphql";
import { Comment } from "@generated/type-graphql";
import { Context } from "../interfaces/context";

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

  @Mutation((returns) => Comment)
  async createComment(
    @Arg("data") data: CreateCommentInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        taskId: data.taskId,
        authorId: data.authorId,
      },
    });
    return comment;
  }

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
