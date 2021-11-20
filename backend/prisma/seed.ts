import bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const password = "password";
  const passwordHash = await bcrypt.hash(password, saltRounds);
  await prisma.organization.create({
    data: {
      name: "Database Management Group E",
      users: {
        create: [
          { username: "micc", displayName: "MiccWan", passwordHash },
          { username: "edison", displayName: "edisonhello", passwordHash },
          { username: "chisheng", displayName: "劉奇聖", passwordHash },
          { username: "professor", displayName: "教授", passwordHash },
          { username: "cat", displayName: "喵", passwordHash },
          { username: "dog", displayName: "汪", passwordHash },
          { username: "not_us", displayName: "打手", passwordHash },
        ],
      },
      projects: {
        create: [
          {
            name: "midterm project",
            labels: {
              create: [
                { name: "frontend", color: "white" },
                { name: "backend", color: "gray" },
                { name: "priority", color: "red" },
                { name: "bugs", color: "red" },
                { name: "issue", color: "yellow" },
                { name: "feature", color: "green" },
              ],
            },
          },
          {
            name: "Group Homework#1: ER Diagram",
            labels: {
              create: [
                { name: "todo", color: "yellow" },
                { name: "priority", color: "red" },
                { name: "done", color: "green" },
              ]
            }
          },
          {
            name: "Group Homework#2: Normal Form",
            labels: {
              create: [
                { name: "todo", color: "yellow" },
                { name: "priority", color: "red" },
                { name: "done", color: "green" },
              ]
            }
          },
        ],
      },
    },
  });
  await prisma.organization.create({
    data: {
      name: "Ansir website",
      users: {
        connect: { id: 2 },
        create: [
          { username: "LJ", displayName: "LJ", passwordHash },
          { username: "song", displayName: "song", passwordHash },
          { username: "Panda", displayName: "Panda", passwordHash },
        ]
      },
      projects: {}
    }
  });
  await prisma.organization.create({
    data: {
      name: "Google Chrome OS",
      users: {
        connect: { id: 2 },
      },
      projects: {}
    }
  });
  await prisma.organization.create({
    data: {
      name: "GRTS",
      users: {
        connect: { id: 2 },
      },
      projects: {}
    }
  });
  await prisma.organization.create({
    data: {
      name: "awesome.",
      users: {
        connect: { id: 2 },
      },
      projects: {}
    }
  });
  await prisma.task.create({
    data: {
      title: "基本架構",
      content: "完成前後端基本架構，設計 API",
      status: "DONE",
      author: { connect: { id: 1 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [
          { id: 1 },
          { id: 2 }
        ]
      },
      users: {
        connect: [
          { id: 3 }
        ]
      }
    }
  });
  await prisma.task.create({
    data: {
      title: "CRUD Resolver",
      content: "加 6 個 entity 的 CRUD resolver，4 個 M-N relation 的 Updates(connect/disconnect) resolver",
      status: "IN_PROGRESS",
      author: { connect: { id: 3 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [
          { id: 2 }
        ]
      },
      users: {
        connect: [
          { id: 1 }
        ]
      }
    }
  });
  await prisma.task.create({
    data: {
      title: "index page",
      content: "",
      status: "DONE",
      author: { connect: { id: 2 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [
          { id: 1 }
        ]
      },
      users: {
        connect: [
          { id: 2 }
        ]
      }
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
        connect: [
          { id: 1 }
        ]
      },
      users: {
        connect: [
          { id: 2 }
        ]
      }
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
        connect: [
          { id: 1 },
          { id: 3 },
        ]
      },
      users: {
        connect: [
          { id: 3 }
        ]
      }
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
        connect: [
          { id: 1 },
          { id: 3 },
        ]
      },
      users: {
        connect: [
          { id: 3 }
        ]
      }
    }
  });
  await prisma.task.create({
    data: {
      title: "Can't redirect in index page",
      content: "I don't know how to redirect in index page <br> help me QAQ",
      status: "TODO",
      author: { connect: { id: 2 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [
          { id: 1 },
          { id: 3 },
          { id: 4 },
        ]
      },
      users: {
        connect: [
          { id: 2 },
          { id: 3 },
        ]
      }
    }
  });
  await prisma.task.create({
    data: {
      title: "Allow user press enter to submit",
      content: "In creation forms, listen on user's enter input to submit",
      status: "TODO",
      author: { connect: { id: 2 } },
      project: { connect: { id: 1 } },
      labels: {
        connect: [
          { id: 1 },
          { id: 5 },
          { id: 6 },
        ]
      },
      users: {
        connect: [
          { id: 2 },
        ]
      }
    }
  });
  await prisma.comment.createMany({
    data: [
      { content: "這也太多了吧", taskId: 5, authorId: 1 },
      { content: "有人要做這個嗎", taskId: 5, authorId: 1 },
      { content: "我可", taskId: 5, authorId: 3 },
      { content: "(y)", taskId: 5, authorId: 2 },
    ],
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
