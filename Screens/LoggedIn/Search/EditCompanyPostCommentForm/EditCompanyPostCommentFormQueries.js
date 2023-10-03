import { gql } from "@apollo/client";

export const EDIT_COMMENT_MUTATION = gql`
  mutation editCompanyPostComment($commentId: Int!, $payload: String!) {
    editCompanyPostComment(commentId: $commentId, payload: $payload) {
      ok
      error
    }
  }
`;
