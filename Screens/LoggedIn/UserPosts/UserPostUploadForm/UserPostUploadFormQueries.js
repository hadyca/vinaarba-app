import { gql } from "@apollo/client";

export const UPLOAD_USER_POST_MUTATION = gql`
  mutation uploadUserPost(
    $fileUrl: [Upload]
    $content: String!
    $categoryId: Int!
  ) {
    uploadUserPost(
      fileUrl: $fileUrl
      content: $content
      categoryId: $categoryId
    ) {
      id
      user {
        id
        username
        avatarUrl
      }
      content
      categoryId
      totalUserPostLikes
      createdAt
      isMine
      file {
        id
        fileUrl
      }
    }
  }
`;
