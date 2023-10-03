import { gql } from "@apollo/client";
import { USER_POST_FRAGMENT } from "../../../../Fragments";

export const CATEGORY_BOARD_QUERY = gql`
  query seeUserCategoryPost($categoryId: Int!, $offset: Int!) {
    seeUserCategoryPost(categoryId: $categoryId, offset: $offset) {
      ...UserPostFragment
      isBlocking
      totalUserPostLikes
      totalUserPostComments
    }
  }
  ${USER_POST_FRAGMENT}
`;
