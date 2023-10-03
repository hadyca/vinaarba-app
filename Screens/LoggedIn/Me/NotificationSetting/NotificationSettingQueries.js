import { gql } from "@apollo/client";

export const NOTIFICATION_QUERY = gql`
  query seeNotificationTypeState {
    seeNotificationTypeState {
      id
      user {
        id
        myCompany {
          id
        }
      }
      notice
      following
      userPostLike
      userPostComment
      companyPostLike
      companyPostComment
    }
  }
`;

export const NOTI_NOTICE_MUTATION = gql`
  mutation notificationNotice($state: Boolean!) {
    notificationNotice(state: $state) {
      ok
      error
    }
  }
`;

export const NOTI_USER_POST_LIKE_MUTATION = gql`
  mutation notificationUserPostLike($state: Boolean!) {
    notificationUserPostLike(state: $state) {
      ok
      error
    }
  }
`;

export const NOTI_USER_POST_COMMENT_MUTATION = gql`
  mutation notificationUserPostComment($state: Boolean!) {
    notificationUserPostComment(state: $state) {
      ok
      error
    }
  }
`;

export const NOTI_COMPANY_POST_LIKE_MUTATION = gql`
  mutation notificationCompanyPostLike($state: Boolean!) {
    notificationCompanyPostLike(state: $state) {
      ok
      error
    }
  }
`;

export const NOTI_COMPANY_POST_COMMENT_MUTATION = gql`
  mutation notificationCompanyPostComment($state: Boolean!) {
    notificationCompanyPostComment(state: $state) {
      ok
      error
    }
  }
`;

export const NOTI_FOLLOWING_MUTATION = gql`
  mutation notificationFollowing($state: Boolean!) {
    notificationFollowing(state: $state) {
      ok
      error
    }
  }
`;
