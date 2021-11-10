import { gql } from "@apollo/client";

export const GET_TASKS_QUERY = gql`
  query GetTasksQuery($tasksOrderBy: [TaskOrderByWithRelationInput!]) {
    tasks(orderBy: $tasksOrderBy) {
      id
      title
      content
    }
  }
`;
