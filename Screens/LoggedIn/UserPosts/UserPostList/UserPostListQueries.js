import { gql } from "@apollo/client";

export const POST_QUERY = gql`
  query seeAllUserPosts($offset: Int!) {
    seeAllUserPosts(offset: $offset) {
      id
      user {
        id
        username
        avatarUrl
      }
      content
      categoryId
      createdAt
      isBlocking
      file {
        id
        fileUrl
      }
      totalUserPostLikes
      totalUserPostComments
    }
  }
`;
