import { gql } from "@apollo/client";

export const POST_DETAIL_QUERY = gql`
  query seeCompanyPost($companyPostId: Int!) {
    seeCompanyPost(companyPostId: $companyPostId) {
      id
      company {
        id
        user {
          id
          username
          avatarUrl
        }
        companyName
        aboutUs
        totalEmployees
        email
        contactNumber
        addressStep1
        addressStep2
        addressStep3
      }
      file {
        id
        fileUrl
      }
      title
      content
      totalCompanyPostComments
      isMine
      isLiked
      isFavorite
      workingDay {
        id
        mon
        tue
        wed
        thu
        fri
        sat
        sun
      }
      dayOption
      startTime
      finishTime
      timeOption
      wageTypeId
      wage
      contactNumber
      email
      companyPostComments {
        id
        user {
          id
          username
          avatarUrl
        }
        payload
        isMine
        createdAt
        companyPostReComments {
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

export const DELETE_COMPANYPOST_MUTATION = gql`
  mutation deleteCompanyPost($companyPostId: Int!) {
    deleteCompanyPost(companyPostId: $companyPostId) {
      ok
      error
    }
  }
`;

export const TOGGLE_COMPANYPOST_LIKE_MUTATION = gql`
  mutation toggleCompanyPostLike($companyPostId: Int!) {
    toggleCompanyPostLike(companyPostId: $companyPostId) {
      ok
      error
    }
  }
`;

export const TOGGLE_COMPANYPOST_FAVORITE_MUTATION = gql`
  mutation toggleFavoriteCompanyPost($companyPostId: Int!) {
    toggleFavoriteCompanyPost(companyPostId: $companyPostId) {
      id
      company {
        id
        companyName
        aboutUs
        addressStep1
        addressStep2
        addressStep3
        user {
          id
          username
          avatarUrl
        }
      }
      title
      content
      createdAt
      file {
        id
        fileUrl
      }
      totalCompanyPostLikes
      totalCompanyPostComments
    }
  }
`;
