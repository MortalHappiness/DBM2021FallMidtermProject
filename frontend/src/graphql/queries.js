import { gql } from "@apollo/client";

export const GET_ME_QUERY = gql`
  query GetMeQuery {
    me {
      id
      username
      displayName
    }
  }
`;

export const GET_TASKS_QUERY = gql`
  query GetTasksQuery($tasksOrderBy: [TaskOrderByWithRelationInput!]) {
    tasks(orderBy: $tasksOrderBy) {
      id
      title
      content
    }
  }
`;

export const GET_ORGS_BY_USER = gql`
  query GetOrganizationsByUser($projectId: Int!, $userId: Int!) {
    organizationsByUser(userId: $userId) {
      id
      name
    }
  }
`;
