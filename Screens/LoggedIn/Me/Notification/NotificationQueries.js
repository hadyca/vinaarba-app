import { gql } from "@apollo/client";

export const NOTIFICATION_QUERY = gql`
  query seeAllNotification($offset: Int!) {
    seeAllNotification(offset: $offset) {
      id
      user {
        id
        username
        avatarUrl
      }
      contentId
      postId
      type
      createdAt
    }
  }
`;
