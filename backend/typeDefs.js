const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    cards: [Card!]!
  }

  type Mutation {
    createCard(data: CreateCardInput!): CreateCardMutationResponse!
  }

  type Subscription {
    card: CardSubscriptionPayload!
  }

  type Card {
    id: Int
    title: String
    content: String
  }

  input CreateCardInput {
    title: String!
    content: String!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type CreateCardMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    card: Card
  }

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }

  interface SubscriptionPayload {
    mutation: MutationType!
  }

  type CardSubscriptionPayload implements SubscriptionPayload {
    mutation: MutationType!
    data: Card!
  }
`;

module.exports = typeDefs;
