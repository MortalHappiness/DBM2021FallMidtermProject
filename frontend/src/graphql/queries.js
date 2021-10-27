import { gql } from "@apollo/client";

export const GET_CARDS_QUERY = gql`
  query GetCardsQuery {
    cards {
      id
      title
      content
    }
  }
`;
