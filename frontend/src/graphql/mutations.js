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

export const JOIN_ORG_MUTATION = gql`
  mutation JoinOrganization($organizationId: Int!) {
    joinOrganization(organizationId: $organizationId) {
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

export const LEAVE_ORG_MUTATION = gql`
  mutation LeaveOrganization($organizationId: Int!) {
    leaveOrganization(organizationId: $organizationId) {
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

export const UPDATE_ORG_MUTATION = gql`
  mutation UpdateOrganization($data: UpdateOrganizationInput!, $organizationId: Int!) {
    updateOrganization(data: $data, id: $organizationId) {
      id
      name
    }
  }
`;

export const DELETE_ORG_MUTATION = gql`
  mutation DeteteOrganization($organizationId: Int!) {
    deleteOrganization(id: $organizationId) {
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

export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($data: UpdateProjectInput!, $projectId: Int!) {
    updateProject(data: $data, id: $projectId) {
      id
      name
    }
  }
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeteteProject($projectId: Int!) {
    deleteProject(id: $projectId) {
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
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($taskId: Int!, $data: UpdateTaskInput!) {
    updateTask(data: $data, id: $taskId) {
      id
      title
      content
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
      title
      content
      status
      createdAt
      updatedAt
    }
  }
`;

export const ADD_LABEL_MUTATION = gql`
  mutation AddLabel($labelId: Int!, $taskId: Int!) {
    addLabel(labelId: $labelId, taskId: $taskId) {
      id
      title
      content
      status
      createdAt
      updatedAt
      labels {
        id
        name
        color
      }
    }
  }
`;

export const REMOVE_LABEL_MUTATION = gql`
  mutation RemoveLabel($labelId: Int!, $taskId: Int!) {
    removeLabel(labelId: $labelId, taskId: $taskId) {
      id
      title
      content
      status
      createdAt
      updatedAt
      labels {
        id
        name
        color
      }
    }
  }
`;

export const ASSIGN_TO_USER = gql`
  mutation AssignToUser($userId: Int!, $taskId: Int!) {
    assignToUser(userId: $userId, taskId: $taskId) {
      id
      title
      content
      status
      createdAt
      updatedAt
      users {
        id
        username
        displayName
      }
    }
  }
`;

export const UNASSIGN_FROM_USER = gql`
  mutation UnassignFromUser($userId: Int!, $taskId: Int!) {
    unassignFromUser(userId: $userId, taskId: $taskId) {
      id
      title
      content
      status
      createdAt
      updatedAt
      users {
        id
        username
        displayName
      }
    }
  }
`;

export const BLOCK_TASK_MUTATION = gql`
  mutation BlockTask($blockingTaskId: Int!, $blockerTaskId: Int!) {
    blockTask(blockingTaskId: $blockingTaskId, blockerTaskId: $blockerTaskId) {
      id
      title
      content
      status
      createdAt
      updatedAt
      blocking {
        id
        title
        content
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const UNBLOCK_TASK_MUTATION = gql`
  mutation UnblockTask($blockingTaskId: Int!, $blockerTaskId: Int!) {
    unblockTask(blockingTaskId: $blockingTaskId, blockerTaskId: $blockerTaskId) {
      id
      title
      content
      status
      createdAt
      updatedAt
      blocking {
        id
        title
        content
        status
        createdAt
        updatedAt
      }
    }
  }
`;

// ###########################################################################
//  comment
// ###########################################################################

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      id
      content
      commentedAt
      updatedAt
    }
  }
`;

export const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateComment($data: UpdateCommentInput!, $commentId: Int!) {
    updateComment(data: $data, id: $commentId) {
      id
      content
      commentedAt
      updatedAt
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($commentId: Int!) {
    deleteComment(id: $commentId) {
      id
      content
      commentedAt
      updatedAt
    }
  }
`;

// ###########################################################################
//  label
// ###########################################################################

export const CREATE_LABEL_MUTATION = gql`
  mutation CreateLabel($data: CreateLabelInput!) {
    createLabel(data: $data) {
      id
      name
      color
    }
  }
`;

export const UPDATE_LABEL_MUTATION = gql`
  mutation UpdateLabel($data: UpdateLabelInput!, $labelId: Int!) {
    updateLabel(data: $data, id: $labelId) {
      id
      name
      color
    }
  }
`;

export const DELETE_LABEL_MUTATION = gql`
  mutation DeleteLabel($labelId: Int!) {
    deleteLabel(id: $labelId) {
      id
      name
      color
    }
  }
`;