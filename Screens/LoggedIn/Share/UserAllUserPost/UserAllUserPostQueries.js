import { gql } from "@apollo/client";

export const USERPOST_QUERY = gql`
  query seeUserAllPosts($userId: Int!, $offset: Int!) {
    seeUserAllPosts(userId: $userId, offset: $offset) {
      id
      user {
        id
        username
        avatarUrl
      }
      content
      categoryId
      createdAt
      file {
        id
        fileUrl
      }
      totalUserPostLikes
      totalUserPostComments
    }
  }
`;
