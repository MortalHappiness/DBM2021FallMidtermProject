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
import { Project } from "@generated/type-graphql";
import { Context } from "../interfaces/context";

@InputType()
class CreateProjectInput implements Partial<Project> {
  @Field()
  name: string;

  @Field()
  organizationId: number;
}

@InputType()
class UpdateProjectInput implements Partial<Project> {
  @Field({ nullable: true })
  name?: string;
}

@Resolver(Project)
class ProjectResolver {
  @Query((returns) => [Project])
  async projects(@Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.project.findMany();
  }

  @Query((returns) => Project)
  async project(@Arg("id", (type) => Int) id: number, @Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.project.findUnique({ where: { id } });
  }

  @Mutation((returns) => Project)
  async createProject(
    @Arg("data") data: CreateProjectInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const project = await prisma.project.create({
      data: {
        name: data.name,
        organizationId: data.organizationId,
      },
    });
    return project;
  }

  @Mutation((returns) => Project)
  async updateProject(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateProjectInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const project = await prisma.project.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
      },
    });

    return project;
  }

  @Mutation((returns) => Project)
  async deleteProject(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const project = await prisma.project.delete({ where: { id } });

    return project;
  }
}

export default ProjectResolver;
