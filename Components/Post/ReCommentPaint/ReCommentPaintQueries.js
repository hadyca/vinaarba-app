import { gql } from "@apollo/client";

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteUserPostReComment($reCommentId: Int!) {
    deleteUserPostReComment(reCommentId: $reCommentId) {
      ok
      error
    }
  }
`;
