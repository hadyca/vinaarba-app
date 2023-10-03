import { gql } from "@apollo/client";

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteCompanyPostComment($commentId: Int!) {
    deleteCompanyPostComment(commentId: $commentId) {
      ok
      totalRecomments
    }
  }
`;
