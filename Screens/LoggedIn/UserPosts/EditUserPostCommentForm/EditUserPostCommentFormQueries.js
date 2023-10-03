import { gql } from "@apollo/client";

export const EDIT_COMMENT_MUTATION = gql`
  mutation editUserPostComment($commentId: Int!, $payload: String!) {
    editUserPostComment(commentId: $commentId, payload: $payload) {
      ok
      error
    }
  }
`;
