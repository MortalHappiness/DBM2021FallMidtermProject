import "reflect-metadata";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import express = require("express");
import jwt = require("express-jwt");
import crypto = require("crypto");
import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { Context } from "./interfaces/context";
import { authChecker } from "./authChecker";

declare global {
  namespace Express {
    interface User {
      client_id: string;
    }
  }
}

const prisma = new PrismaClient();

async function main() {
  const secret = process.env.SECRET || crypto.randomBytes(48).toString("hex");
  const PORT = 4000;
  const app = express();
  const httpServer = createServer(app);

  app.use(
    jwt({
      secret,
      algorithms: ["HS256"],
      credentialsRequired: false,
    })
  );

  const schema = await buildSchema({ resolvers, authChecker });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context: Context = { prisma, secret, user: req.user };
      return context;
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  await server.start();
  server.applyMiddleware({ app, cors: { credentials: true } });

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
