import { gql } from "@apollo/client";

export const TOGGLE_FOLLOWING_MUTATION = gql`
  mutation toggleFollowing($userId: Int!) {
    toggleFollowing(userId: $userId) {
      id
      username
      avatarUrl
      myCompany {
        id
        companyName
      }
      isFollowing
      isMe
    }
  }
`;
