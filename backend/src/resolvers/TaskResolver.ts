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

  @Authorized()
  @Mutation((returns) => Task)
  async createTask(
    @Arg("data") data: CreateTaskInput,
    @Ctx() context: Context
  ) {
    const { prisma, user } = context;

    const task = await prisma.task.create({
      data: {
        title: data.title,
        content: data.content ?? undefined,
        status: "TODO",
        projectId: data.projectId,
        // TODO: tell ts client_id will not be undefined after authorized
        authorId: user?.client_id || 0,
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

  @Mutation((returns) => Task)
  async addLabel(
    @Arg("taskId", (type) => Int) taskId: number,
    @Arg("labelId", (type) => Int) labelId: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        labels: {
          connect: { id: labelId }
        },
      },
    });

    return task;
  }

  @Mutation((returns) => Task)
  async removeLabel(
    @Arg("taskId", (type) => Int) taskId: number,
    @Arg("labelId", (type) => Int) labelId: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        labels: {
          disconnect: { id: labelId }
        },
      },
    });

    return task;
  }

  @Mutation((returns) => Task)
  async assignToUser(
    @Arg("taskId", (type) => Int) taskId: number,
    @Arg("userId", (type) => Int) userId: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        users: {
          connect: { id: userId }
        },
      },
    });

    return task;
  }

  @Mutation((returns) => Task)
  async unassignFromUser(
    @Arg("taskId", (type) => Int) taskId: number,
    @Arg("userId", (type) => Int) userId: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        users: {
          disconnect: { id: userId }
        },
      },
    });

    return task;
  }

  @Mutation((returns) => Task)
  async blockTask(
    @Arg("blockerTaskId", (type) => Int) blockerTaskId: number,
    @Arg("blockingTaskId", (type) => Int) blockingTaskId: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const task = await prisma.task.update({
      where: { id: blockerTaskId },
      data: {
        blocking: {
          connect: { id: blockingTaskId }
        },
      },
    });

    return task;
  }

  @Mutation((returns) => Task)
  async unblockTask(
    @Arg("blockerTaskId", (type) => Int) blockerTaskId: number,
    @Arg("blockingTaskId", (type) => Int) blockingTaskId: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const task = await prisma.task.update({
      where: { id: blockerTaskId },
      data: {
        blocking: {
          disconnect: { id: blockingTaskId }
        },
      },
    });

    return task;
  }
}

export default TaskResolver;
