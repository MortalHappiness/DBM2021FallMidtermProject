import { gql } from "@apollo/client";

export const GET_CARDS_QUERY = gql`
  query GetCardsQuery($cardsOrderBy: [CardOrderByWithRelationInput!]) {
    cards(orderBy: $cardsOrderBy) {
      id
      title
      content
    }
  }
`;
