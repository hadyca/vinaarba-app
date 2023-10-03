import { gql } from "@apollo/client";

export const FOLLOWERS_QUERY = gql`
  query seeFollowers($userId: Int!, $offset: Int!) {
    seeFollowers(userId: $userId, offset: $offset) {
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
