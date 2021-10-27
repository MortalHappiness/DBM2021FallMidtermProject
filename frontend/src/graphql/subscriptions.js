import { gql } from "@apollo/client";

export const CARD_SUBSCRIPTION = gql`
  subscription CardSubscription {
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
