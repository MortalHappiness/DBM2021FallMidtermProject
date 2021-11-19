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
import { Label } from "@generated/type-graphql";
import { Context } from "../interfaces/context";

@InputType()
class CreateLabelInput implements Partial<Label> {
  @Field()
  name: string;

  @Field()
  color: string;

  @Field()
  projectId: number;
}

@InputType()
class UpdateLabelInput implements Partial<Label> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  color?: string;
}

@Resolver(Label)
class LabelResolver {
  @Query((returns) => [Label])
  async labels(@Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.label.findMany();
  }

  @Query((returns) => Label)
  async label(@Arg("id", (type) => Int) id: number, @Ctx() context: Context) {
    const { prisma } = context;
    return await prisma.label.findUnique({ where: { id } });
  }

  @Mutation((returns) => Label)
  async createLabel(
    @Arg("data") data: CreateLabelInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    if (data.color === undefined) {
      data.color = "blue";
    }

    const label = await prisma.label.create({
      data: {
        name: data.name,
        color: data.color,
        projectId: data.projectId,
      },
    });
    return label;
  }

  @Mutation((returns) => Label)
  async updateLabel(
    @Arg("id", (type) => Int) id: number,
    @Arg("data") data: UpdateLabelInput,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const label = await prisma.label.update({
      where: { id },
      data: {
        name: data.name,
        color: data.color,
      },
    });
    return label;
  }

  @Mutation((returns) => Label)
  async deleteLabel(
    @Arg("id", (type) => Int) id: number,
    @Ctx() context: Context
  ) {
    const { prisma } = context;

    const label = await prisma.label.delete({ where: { id } });

    return label;
  }
}

export default LabelResolver;
