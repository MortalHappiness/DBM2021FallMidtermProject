import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation($password: String!, $username: String!) {
    register(password: $password, username: $username)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($password: String!, $username: String!) {
    login(password: $password, username: $username)
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTaskMutation($data: CreateTaskInput!) {
    createTask(data: $data) {
      id
      title
      content
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTaskMutation($id: Int!, $data: UpdateTaskInput!) {
    updateTask(id: $id, data: $data) {
      id
      title
      content
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
      title
      content
    }
  }
`;
