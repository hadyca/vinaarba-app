import { gql } from "@apollo/client";

export const EDIT_USERNAME_MUTATION = gql`
  mutation editProfile($username: String, $usernameEditDate: String) {
    editProfile(username: $username, usernameEditDate: $usernameEditDate) {
      id
      username
    }
  }
`;
