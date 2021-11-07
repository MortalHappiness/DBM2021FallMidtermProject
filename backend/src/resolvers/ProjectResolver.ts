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
import { Project } from "@generated/type-graphql";
import { Context } from "../context";
import MutationType from "./MutationType";
import SubscriptionPayload from "./SubscriptionPayload";

@InputType()
class CreateProjectInput implements Partial<Project> {
  @Field()
  name: string;

  @Field()
  organiztaionId: number;
}

@InputType()
class UpdateProjectInput implements Partial<Project> {
  @Field({ nullable: true })
  name?: string;
}

@ObjectType({ implements: SubscriptionPayload })
class ProjectSubscriptionPayload extends SubscriptionPayload {
  @Field((type) => Project)
  project: Project;
}

@Resolver(Project)
class ProjectResolver {
  @Mutation((returns) => Project)
  async createProject(
    @Arg("data") data: CreateProjectInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const project = await prisma.project.create({
      data: {
        name: data.name,
        organiztaionId: data.organiztaionId,
      },
    });
    pubsub.publish("PROJECT", {
      mutationType: MutationType.CREATED,
      project,
    });
    return project;
  }

  @Mutation((returns) => Project)
  async updateProject(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateProjectInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const project = await prisma.project.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
      },
    });

    pubsub.publish("PROJECT", {
      mutationType: MutationType.UPDATED,
      project,
    });
    return project;
  }

  @Mutation((returns) => Project)
  async deleteProject(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const project = await prisma.project.delete({ where: { id } });

    pubsub.publish("PROJECT", {
      mutationType: MutationType.DELETED,
      project,
    });
    return project;
  }

  @Subscription({ topics: "PROJECT" })
  projectSubscription(
    @Root() projectSubscriptionPayload: ProjectSubscriptionPayload
  ): ProjectSubscriptionPayload {
    return projectSubscriptionPayload;
  }
}

export default ProjectResolver;
