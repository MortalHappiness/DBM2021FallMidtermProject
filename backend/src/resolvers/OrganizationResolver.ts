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
import { Organization } from "@generated/type-graphql";
import { Context } from "../interfaces/context";
import MutationType from "./MutationType";
import SubscriptionPayload from "./SubscriptionPayload";

@InputType()
class CreateOrganizationInput implements Partial<Organization> {
  @Field()
  name: string;
}

@InputType()
class UpdateOrganizationInput implements Partial<Organization> {
  @Field({ nullable: true })
  name?: string;
}

@ObjectType({ implements: SubscriptionPayload })
class OrganizationSubscriptionPayload extends SubscriptionPayload {
  @Field((type) => Organization)
  organization: Organization;
}

@Resolver(Organization)
class OrganizationResolver {
  @Query((returns) => [Organization])
  async organizations(@Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.organization.findMany();
  }

  @Mutation((returns) => Organization)
  async createOrganization(
    @Arg("data") data: CreateOrganizationInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const organization = await prisma.organization.create({
      data: {
        name: data.name,
      },
    });
    pubsub.publish("ORGANIZATION", {
      mutationType: MutationType.CREATED,
      organization,
    });
    return organization;
  }

  @Mutation((returns) => Organization)
  async updateOrganization(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateOrganizationInput,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const organization = await prisma.organization.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
      },
    });

    pubsub.publish("ORGANIZATION", {
      mutationType: MutationType.UPDATED,
      organization,
    });
    return organization;
  }

  @Mutation((returns) => Organization)
  async deleteOrganization(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context,
    @PubSub() pubsub: PubSubEngine
  ) {
    const { prisma } = context;

    const organization = await prisma.organization.delete({ where: { id } });

    pubsub.publish("ORGANIZATION", {
      mutationType: MutationType.DELETED,
      organization,
    });
    return organization;
  }

  @Subscription({ topics: "ORGANIZATION" })
  organizationSubscription(
    @Root() organizationSubscriptionPayload: OrganizationSubscriptionPayload
  ): OrganizationSubscriptionPayload {
    return organizationSubscriptionPayload;
  }
}

export default OrganizationResolver;
