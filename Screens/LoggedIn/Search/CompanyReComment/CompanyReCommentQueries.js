import { gql } from "@apollo/client";

export const COMMENT_QUERY = gql`
  query seeCompanyPostComment($companyPostCommentId: Int!) {
    seeCompanyPostComment(companyPostCommentId: $companyPostCommentId) {
      id
      user {
        id
        username
        avatarUrl
      }
      payload
      companyPostReComments {
        id
        user {
          id
          username
          avatarUrl
        }
        payload
        createdAt
        updatedAt
        isMine
      }
      createdAt
      updatedAt
      isMine
    }
  }
`;
