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
  query GetOrgQuery($organizationId: Int!) {
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

export const GET_PROJECT_QUERY = gql`
  query GetProjectQuery($projectId: Int!) {
    project(id: $projectId) {
      id
      name
      tasks {
        id
        title
        status
        labels {
          id
          name
          color
        }
      }
      labels {
        id
        name
        color
      }
    }
  }
`;

export const GET_TASK_QUERY = gql`
  query GetTaskQuery($taskId: Int!) {
    task(id: $taskId) {
      id
      title
      content
      status
      createdAt
      updatedAt
    }
  }
`;
