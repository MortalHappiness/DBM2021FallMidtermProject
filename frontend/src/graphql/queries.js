import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  query Query {
    cards {
      id
      title
      content
    }
  }
`;
