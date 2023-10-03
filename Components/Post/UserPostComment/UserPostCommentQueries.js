import { gql } from "@apollo/client";

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteUserPostComment($commentId: Int!) {
    deleteUserPostComment(commentId: $commentId) {
      ok
      totalRecomments
    }
  }
`;
