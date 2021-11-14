import { gql } from "@apollo/client";

export const GET_ME_QUERY = gql`
  query GetMeQuery {
    me {
      id
      username
      displayName
      organizations {
        id
        name
      }
    }
  }
`;

export const GET_ORG_QUERY = gql`
  query Query($organizationId: Int!) {
    organization(id: $organizationId) {
      id
      name
      projects {
        id
        name
      }
    }
  }
`;
