import { gql } from "@apollo/client";

export const EDIT_COMMENT_MUTATION = gql`
  mutation editCompanyPostReComment($reCommentId: Int!, $payload: String!) {
    editCompanyPostReComment(reCommentId: $reCommentId, payload: $payload) {
      ok
      error
    }
  }
`;
