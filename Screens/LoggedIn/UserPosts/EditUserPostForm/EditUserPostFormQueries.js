import { gql } from "@apollo/client";

export const EDIT_USERPOST_MUTATION = gql`
  mutation editUserPost(
    $userPostId: Int!
    $fileUrl: [Upload]
    $content: String!
    $categoryId: Int!
  ) {
    editUserPost(
      userPostId: $userPostId
      fileUrl: $fileUrl
      content: $content
      categoryId: $categoryId
    ) {
      ok
      error
      id
    }
  }
`;
