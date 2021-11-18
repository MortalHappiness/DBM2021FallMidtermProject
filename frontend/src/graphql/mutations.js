import { gql } from "@apollo/client";

// ###########################################################################
//  user
// ###########################################################################

export const REGISTER_MUTATION = gql`
  mutation Register($password: String!, $username: String!) {
    register(password: $password, username: $username)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($password: String!, $username: String!) {
    login(password: $password, username: $username)
  }
`;

// ###########################################################################
//  organization
// ###########################################################################

export const CREATE_ORG_MUTATION = gql`
  mutation CreateOrganization($data: CreateOrganizationInput!) {
    createOrganization(data: $data) {
      id
      name
      users {
        id
        username
        displayName
      }
    }
  }
`;

export const DELETE_ORG_MUTATION = gql`
  mutation DeteteOrganization($deleteOrganizationId: Int!) {
    deleteOrganization(id: $deleteOrganizationId) {
      id
      name
    }
  }
`;

// ###########################################################################
//  project
// ###########################################################################

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($data: CreateProjectInput!) {
    createProject(data: $data) {
      id
      name
    }
  }
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeteteProject($deleteProjectId: Int!) {
    deleteProject(id: $deleteProjectId) {
      id
      name
    }
  }
`;

// ###########################################################################
//  task
// ###########################################################################

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($data: CreateTaskInput!) {
    createTask(data: $data) {
      id
      title
      content
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($updateTaskId: Int!, $data: UpdateTaskInput!) {
    updateTask(data: $data, id: $updateTaskId) {
      id
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
      title
      content
    }
  }
`;
