import { gql } from "@apollo/client";

export const CREATE_CARD_MUTATION = gql`
  mutation CreateCardMutation($data: CreateCardInput!) {
    createCard(data: $data) {
      id
      title
      content
    }
  }
`;

export const UPDATE_CARD_MUTATION = gql`
  mutation UpdateCardMutation($id: Int!, $data: UpdateCardInput!) {
    updateCard(id: $id, data: $data) {
      id
      title
      content
    }
  }
`;

export const DELETE_CARD_MUTATION = gql`
  mutation DeleteCardMutation($id: Int!) {
    deleteCard(id: $id) {
      id
      title
      content
    }
  }
`;
