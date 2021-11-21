import bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";
import { labelColors } from "../src/resolvers/LabelColorsResolver";

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const password = "password";
  const passwordHash = await bcrypt.hash(password, saltRounds);

  await prisma.user.createMany({
    data: [
      { username: "admin", displayName: "Admin", passwordHash },
      { username: "micc", displayName: "MiccWan", passwordHash },
      { username: "edison", displayName: "edisonhello", passwordHash },
      { username: "chisheng", displayName: "劉奇聖", passwordHash },
      { username: "professor", displayName: "教授", passwordHash },
      { username: "ta", displayName: "助教", passwordHash },
      { username: "cat", displayName: "喵", passwordHash },
      { username: "dog", displayName: "汪", passwordHash },
      { username: "not_us", displayName: "打手", passwordHash },
    ],
  });
  await prisma.organization.create({
    data: {
      name: "Database Management Group E",
      users: {
        connect: [
          { username: "admin" },
          { username: "micc" },
          { username: "edison" },
          { username: "chisheng" },
          { username: "professor" },
          { username: "ta" },
        ],
      },
      projects: {
        create: [
          {
            name: "midterm project",
            labels: {
              create: [
                { name: "frontend", color: labelColors.BLUE },
                { name: "backend", color: labelColors.BROWN },
                { name: "important", color: labelColors.RED },
                { name: "bugs", color: labelColors.ORANGE },
                { name: "issue", color: labelColors.YELLOW },
                { name: "feature", color: labelColors.PURPLE },
                { name: "database", color: labelColors.GRAY },
              ],
            },
          },
          {
            name: "Group Homework#1: ER Diagram",
            labels: {
              create: [
                { name: "low priority", color: labelColors.GREEN },
                { name: "important", color: labelColors.RED },
              ],
            },
          },
          {
            name: "Group Homework#2: Normal Form",
            labels: {
              create: [
                { name: "low priority", color: labelColors.GREEN },
                { name: "important", color: labelColors.RED },
              ],
            },
          },
        ],
      },
    },
  });
  await prisma.organization.create({
    data: {
      name: "Ansir website",
      users: {
        connect: { username: "admin" },
        create: [
          { username: "LJ", displayName: "LJ", passwordHash },
          { username: "song", displayName: "song", passwordHash },
          { username: "Panda", displayName: "Panda", passwordHash },
        ],
      },
      projects: {},
    },
  });
  await prisma.organization.create({
    data: {
      name: "Google Chrome OS",
      users: {
        connect: { username: "admin" },
      },
      projects: {},
    },
  });
  await prisma.organization.create({
    data: {
      name: "GRTS",
      users: {
        connect: { username: "admin" },
      },
      projects: {},
    },
  });
  await prisma.organization.create({
    data: {
      name: "awesome.",
      users: {
        connect: { username: "admin" },
      },
      projects: {},
    },
  });
  await prisma.task.create({
    data: {
      title: "基本架構",
      content: "完成前後端基本架構，設計 API",
      status: "DONE",
      author: { connect: { username: "chisheng" } },
      project: { connect: { id: 1 } },
      createdAt: new Date("2021/10/25 16:00:00"),
      updatedAt: new Date("2021/10/25 18:30:00"),
      labels: {
        connect: [{ id: 1 }, { id: 2 }, { id: 7 }],
      },
      users: {
        connect: [{ username: "chisheng" }],
      },
      comments: {
        create: [
          {
            author: { connect: { username: "chisheng" } },
            content:
              "1. 前端會用 React\n2. 後端會用 NodeJS typeGraphQL\n3. 前後端使用 GraphQL 溝通\n4. 資料庫使用 PostgreSQL, 使用 prisma ORM 串接",
            commentedAt: new Date("2021/10/25 16:00:00"),
          },
          {
            author: { connect: { username: "micc" } },
            content: "我可以幫忙後端",
            commentedAt: new Date("2021/10/25 16:30:00"),
          },
          {
            author: { connect: { username: "edison" } },
            content: "那我先去寫前端",
            commentedAt: new Date("2021/10/25 17:00:00"),
          },
          {
            author: { connect: { username: "chisheng" } },
            content: "那我架構弄完之後就前後端都寫，看心情",
            commentedAt: new Date("2021/10/25 18:30:00"),
          },
        ],
      },
    },
  });
  await prisma.task.create({
    data: {
      title: "CRUD Resolver",
      content:
        "1. 加 6 個 entity 的 CRUD resolver\n2. 加 4 個 M-N relation 的 Updates(connect/disconnect) resolver",
      status: "DONE",
      author: { connect: { username: "micc" } },
      createdAt: new Date("2021/11/01 16:00:00"),
      updatedAt: new Date("2021/11/01 16:00:00"),
      project: { connect: { id: 1 } },
      labels: {
        connect: [{ id: 2 }],
      },
      users: {
        connect: [{ username: "micc" }],
      },
      blockedBy: { connect: [{ id: 1 }] },
    },
  });
  await prisma.task.create({
    data: {
      title: "index page",
      content: "",
      status: "DONE",
      author: { connect: { id: 2 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [{ id: 1 }],
      },
      users: {
        connect: [{ id: 2 }],
      },
    },
  });
  await prisma.task.create({
    data: {
      title: "organization page",
      content: "",
      status: "DONE",
      author: { connect: { id: 2 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [{ id: 1 }],
      },
      users: {
        connect: [{ id: 2 }],
      },
    },
  });
  await prisma.task.create({
    data: {
      title: "task modal",
      content: "comment, label, author, blocked by, assignedTo",
      status: "IN_PROGRESS",
      author: { connect: { id: 1 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [{ id: 1 }, { id: 3 }],
      },
      users: {
        connect: [{ id: 3 }],
      },
      comments: {
        create: [
          { content: "這也太多了吧", authorId: 1 },
          { content: "有人要做這個嗎", authorId: 1 },
          { content: "我可", authorId: 3 },
          { content: "(y)", authorId: 2 },
        ],
      },
    },
  });
  await prisma.task.create({
    data: {
      title: "add react router dom",
      content: "",
      status: "DONE",
      author: { connect: { id: 3 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [{ id: 1 }, { id: 3 }],
      },
      users: {
        connect: [{ id: 3 }],
      },
    },
  });
  await prisma.task.create({
    data: {
      title: "Can't redirect in index page",
      content: "I don't know how to redirect in index page <br> help me QAQ",
      status: "TODO",
      author: { connect: { id: 2 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [{ id: 1 }, { id: 3 }, { id: 4 }],
      },
      users: {
        connect: [{ id: 2 }, { id: 3 }],
      },
    },
  });
  await prisma.task.create({
    data: {
      title: "Allow user press enter to submit",
      content: "In creation forms, listen on user's enter input to submit",
      status: "TODO",
      author: { connect: { id: 2 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [{ id: 1 }, { id: 5 }, { id: 6 }],
      },
      users: {
        connect: [{ id: 2 }],
      },
    },
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
