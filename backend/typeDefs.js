const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    cards: [Card!]!
  }

  type Mutation {
    createCard(data: CreateCardInput!): CardMutationResponse!
    updateCard(id: ID!, data: UpdateCardInput!): CardMutationResponse!
    deleteCard(id: ID!): CardMutationResponse!
  }

  type Subscription {
    card: CardSubscriptionPayload!
  }

  type Card {
    id: ID
    title: String
    content: String
  }

  input CreateCardInput {
    title: String!
    content: String!
  }

  input UpdateCardInput {
    title: String
    content: String
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type CardMutationResponse implements MutationResponse {
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
