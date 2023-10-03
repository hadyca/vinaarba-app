import { gql } from "@apollo/client";

export const TOGGLE_BLOCKING_MUTATION = gql`
  mutation toggleBlocking($userId: Int!) {
    toggleBlocking(userId: $userId) {
      id
    }
  }
`;
