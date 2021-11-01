import { gql } from "@apollo/client";

export const CARD_SUBSCRIPTION = gql`
  subscription CardSubscription {
    cardSubscription {
      mutationType
      card {
        id
        title
        content
      }
    }
  }
`;
