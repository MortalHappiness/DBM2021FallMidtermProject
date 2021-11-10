import { gql } from "@apollo/client";

export const TASK_SUBSCRIPTION = gql`
  subscription TaskSubscription {
    taskSubscription {
      mutationType
      task {
        id
        title
        content
      }
    }
  }
`;
