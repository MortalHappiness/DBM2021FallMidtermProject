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
import { Task } from "@generated/type-graphql";
import { Context } from "../interfaces/context";
import MutationType from "./MutationType";
import SubscriptionPayload from "./SubscriptionPayload";

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

@ObjectType({ implements: SubscriptionPayload })
class TaskSubscriptionPayload extends SubscriptionPayload {
  @Field((type) => Task)
  task: Task;
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
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
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
    pubsub.publish("TASK", {
      mutationType: MutationType.CREATED,
      task,
    });
    return task;
  }

  @Mutation((returns) => Task)
  async updateTask(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateTaskInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
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

    pubsub.publish("TASK", {
      mutationType: MutationType.UPDATED,
      task,
    });
    return task;
  }

  @Mutation((returns) => Task)
  async deleteTask(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const task = await prisma.task.delete({ where: { id } });

    pubsub.publish("TASK", {
      mutationType: MutationType.DELETED,
      task,
    });
    return task;
  }

  @Subscription({ topics: "TASK" })
  taskSubscription(
    @Root() taskSubscriptionPayload: TaskSubscriptionPayload
  ): TaskSubscriptionPayload {
    return taskSubscriptionPayload;
  }
}

export default TaskResolver;
