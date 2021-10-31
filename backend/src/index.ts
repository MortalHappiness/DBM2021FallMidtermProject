import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express = require("express");
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { context } from "./context";

(async function () {
  const PORT = 4000;
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

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
})();
