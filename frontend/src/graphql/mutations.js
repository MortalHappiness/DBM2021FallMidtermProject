import { gql } from "@apollo/client";

const MUTATION_RESPONSE = gql`
  fragment MutationResponseFields on MutationResponse {
    code
    success
    message
  }
`;

export const CREATE_CARD_MUTATION = gql`
  ${MUTATION_RESPONSE}
  mutation CreateCardMutation($data: CreateCardInput!) {
    createCard(data: $data) {
      ...MutationResponseFields
      card {
        id
        title
        content
      }
    }
  }
`;

export const UPDATE_CARD_MUTATION = gql`
  ${MUTATION_RESPONSE}
  mutation UpdateCardMutation($id: ID!, $data: UpdateCardInput!) {
    updateCard(id: $id, data: $data) {
      ...MutationResponseFields
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
      ...MutationResponseFields
      card {
        id
        title
        content
      }
    }
  }
`;
