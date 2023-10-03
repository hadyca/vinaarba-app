import { gql } from "@apollo/client";

export const CREATE_COMMENT_MUTATION = gql`
  mutation createCompanyPostComment($companyPostId: Int!, $payload: String!) {
    createCompanyPostComment(companyPostId: $companyPostId, payload: $payload) {
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
  mutation createCompanyPostReComment(
    $companyPostCommentId: Int!
    $payload: String!
  ) {
    createCompanyPostReComment(
      companyPostCommentId: $companyPostCommentId
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
