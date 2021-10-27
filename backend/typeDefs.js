const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Card {
    id: Int
    title: String
    content: String
  }

  input CreateCardInput {
    title: String!
    content: String!
  }

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }

  type CardSubscriptionPayload {
    mutation: MutationType!
    data: Card!
  }

  type Query {
    cards: [Card!]!
  }

  type Mutation {
    createCard(data: CreateCardInput!): Card!
  }

  type Subscription {
    card: CardSubscriptionPayload!
  }
`;

module.exports = typeDefs;
