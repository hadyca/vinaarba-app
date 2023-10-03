import { gql } from "@apollo/client";

export const CREATE_COMMENT_MUTATION = gql`
  mutation createUserPostComment($userPostId: Int!, $payload: String!) {
    createUserPostComment(userPostId: $userPostId, payload: $payload) {
      createdAt
      id
      isMine
      payload
      user {
        id
        username
        avatarUrl
      }
    }
  }
`;

export const CREATE_RECOMMENT_MUTATION = gql`
  mutation createUserRePostComment(
    $userPostCommentId: Int!
    $payload: String!
  ) {
    createUserPostReComment(
      userPostCommentId: $userPostCommentId
      payload: $payload
    ) {
      createdAt
      id
      isMine
      payload
      user {
        id
        username
        avatarUrl
      }
    }
  }
`;
