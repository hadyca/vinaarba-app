import { gql } from "@apollo/client";

export const POST_DETAIL_QUERY = gql`
  query seeUserPost($userPostId: Int!) {
    seeUserPost(userPostId: $userPostId) {
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
      isLiked
      isMine
      isFavorite
      totalUserPostComments
      userPostComments {
        id
        user {
          id
          username
          avatarUrl
        }
        payload
        isMine
        createdAt
        userPostReComments {
          id
          user {
            id
            username
            avatarUrl
          }
          payload
          isMine
          createdAt
        }
      }
    }
  }
`;

export const DELETE_USERPOST_MUTATION = gql`
  mutation deleteUserPost($userPostId: Int!) {
    deleteUserPost(userPostId: $userPostId) {
      ok
      error
    }
  }
`;

export const TOGGLE_USERPOST_LIKE_MUTATION = gql`
  mutation toggleUserPostLike($userPostId: Int!) {
    toggleUserPostLike(userPostId: $userPostId) {
      ok
      error
    }
  }
`;

export const TOGGLE_USERPOST_FAVORITE_MUTATION = gql`
  mutation toggleFavoriteUserPost($userPostId: Int!) {
    toggleFavoriteUserPost(userPostId: $userPostId) {
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
