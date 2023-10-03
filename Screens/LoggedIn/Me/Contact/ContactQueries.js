import { gql } from "@apollo/client";

export const CONTACT_MUTATION = gql`
  mutation contact($type: String!, $content: String!, $email: String!) {
    contact(type: $type, content: $content, email: $email) {
      ok
      error
      id
    }
  }
`;
