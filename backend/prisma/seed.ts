import bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const password = "password";
  const passwordHash = await bcrypt.hash(password, saltRounds);
  await prisma.organization.create({
    data: {
      name: "org_1",
      users: {
        create: [
          { username: "user_1", displayName: "Alice", passwordHash },
          { username: "user_2", displayName: "Bob", passwordHash },
        ],
      },
      projects: {
        create: [
          {
            name: "project_1",
            labels: {
              create: [
                { name: "label_1", color: "red" },
                { name: "label_2", color: "blue" },
                { name: "label_3", color: "yello" },
                { name: "label_4", color: "green" },
              ],
            },
          },
          { name: "project_2" },
        ],
      },
    },
  });
  await prisma.task.createMany({
    data: [
      {
        title: "task_1",
        content: "task_1_content",
        status: "TODO",
        authorId: 1,
        projectId: 1,
      },
      {
        title: "task_2",
        content: "task_2_content",
        status: "IN_PROGRESS",
        authorId: 1,
        projectId: 1,
      },
      {
        title: "task_3",
        content: "task_3_content",
        status: "DONE",
        authorId: 2,
        projectId: 1,
      },
      {
        title: "task_4",
        content: "task_4_content",
        status: "TODO",
        authorId: 2,
        projectId: 1,
      },
    ],
  });
  await prisma.comment.createMany({
    data: [
      { content: "comment_1", taskId: 1, authorId: 1 },
      { content: "comment_2", taskId: 1, authorId: 1 },
      { content: "comment_3", taskId: 1, authorId: 2 },
      { content: "comment_4", taskId: 1, authorId: 1 },
    ],
  });
  await prisma.task.update({
    where: { id: 1 },
    data: { labels: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] } },
  });
  await prisma.task.update({
    where: { id: 2 },
    data: { labels: { connect: [{ id: 2 }, { id: 4 }] } },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
