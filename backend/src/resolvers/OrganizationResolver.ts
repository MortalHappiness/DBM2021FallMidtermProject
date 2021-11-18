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
import { Organization } from "@generated/type-graphql";
import { Context } from "../interfaces/context";

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

@Resolver(Organization)
class OrganizationResolver {
  @Query((returns) => [Organization])
  async organizations(@Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.organization.findMany();
  }

  @Query((returns) => Organization)
  async organization(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;
    return await prisma.organization.findUnique({ where: { id } });
  }

  @Authorized()
  @Mutation((returns) => Organization)
  async createOrganization(
    @Arg("data") data: CreateOrganizationInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        users: {
          connect: [{ id: context.user?.client_id }]
        }
      },
    });
    return organization;
  }

  @Mutation((returns) => Organization)
  async updateOrganization(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateOrganizationInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const organization = await prisma.organization.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
      },
    });

    return organization;
  }

  @Mutation((returns) => Organization)
  async deleteOrganization(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const organization = await prisma.organization.delete({ where: { id } });

    return organization;
  }
}

export default OrganizationResolver;
