import { gql } from "@apollo/client";

export const CARD_SUBSCRIPTION = gql`
  subscription Subscription {
    card {
      mutation
      data {
        id
        title
        content
      }
    }
  }
`;
