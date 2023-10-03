import { gql } from "@apollo/client";

export const FOLLOWING_QUERY = gql`
  query seeFollowing($userId: Int!, $offset: Int!) {
    seeFollowing(userId: $userId, offset: $offset) {
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
