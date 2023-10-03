import { gql } from "@apollo/client";

export const EDIT_BIO_MUTATION = gql`
  mutation editProfile($bio: String) {
    editProfile(bio: $bio) {
      id
      bio
    }
  }
`;
