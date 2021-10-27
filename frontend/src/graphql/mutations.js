import { gql } from "@apollo/client";

const MUTATION_RESPONSE = gql`
  fragment MutationResponse on MutationResponse {
    code
    success
    message
  }
`;

export const CREATE_CARD_MUTATION = gql`
  ${MUTATION_RESPONSE}
  mutation CreateCardMutation($data: CreateCardInput!) {
    createCard(data: $data) {
      ...MutationResponse
      card {
        id
        title
        content
      }
    }
  }
`;

export const DELETE_CARD_MUTATION = gql`
  ${MUTATION_RESPONSE}
  mutation DeleteCardMutation($id: ID!) {
    deleteCard(id: $id) {
      ...MutationResponse
      card {
        id
        title
        content
      }
    }
  }
`;
