import "reflect-metadata";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import express = require("express");
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { context } from "./context";

async function main() {
  const PORT = 4000;
  const app = express();
  const httpServer = createServer(app);

  const schema = await buildSchema({ resolvers });

  const server = new ApolloServer({
    schema,
    context,
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
    {
      schema,
      execute,
      subscribe,
      onConnect() {
        return context;
      },
    },
    { server: httpServer, path: server.graphqlPath }
  );

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await context.prisma.$disconnect();
  });
