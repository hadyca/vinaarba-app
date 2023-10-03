import { gql } from "@apollo/client";

export const EDIT_COMMENT_MUTATION = gql`
  mutation editUserPostReComment($reCommentId: Int!, $payload: String!) {
    editUserPostReComment(reCommentId: $reCommentId, payload: $payload) {
      ok
      error
    }
  }
`;
