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
import { Task } from "@generated/type-graphql";
import { Context } from "../interfaces/context";

@InputType()
class CreateTaskInput implements Partial<Task> {
  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  projectId: number;

  @Field()
  authorId: number;
}

@InputType()
class UpdateTaskInput implements Partial<Task> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  status?: string;
}

@Resolver(Task)
class TaskResolver {
  @Query((returns) => [Task])
  async tasks(@Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.task.findMany();
  }

  @Query((returns) => Task)
  async task(@Arg("id", (type) => Int) id: number, @Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.task.findUnique({ where: { id } });
  }

  @Mutation((returns) => Task)
  async createTask(
    @Arg("data") data: CreateTaskInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const task = await prisma.task.create({
      data: {
        title: data.title,
        content: data.content ?? undefined,
        status: "TODO",
        projectId: data.projectId,
        authorId: data.authorId,
      },
    });
    return task;
  }

  @Mutation((returns) => Task)
  async updateTask(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateTaskInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const task = await prisma.task.update({
      where: { id },
      data: {
        title: data.title ?? undefined,
        content: data.content ?? undefined,
        status: data.status ?? undefined,
      },
    });

    return task;
  }

  @Mutation((returns) => Task)
  async deleteTask(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const task = await prisma.task.delete({ where: { id } });

    return task;
  }
}

export default TaskResolver;
