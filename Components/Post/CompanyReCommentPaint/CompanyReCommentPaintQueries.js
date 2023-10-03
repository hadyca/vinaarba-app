import { gql } from "@apollo/client";

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteCompanyPostReComment($reCommentId: Int!) {
    deleteCompanyPostReComment(reCommentId: $reCommentId) {
      ok
      error
    }
  }
`;
