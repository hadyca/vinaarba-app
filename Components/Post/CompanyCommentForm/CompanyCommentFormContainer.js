import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Alert, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  CREATE_COMMENT_MUTATION,
  CREATE_RECOMMENT_MUTATION,
} from "./CompanyCommentFormQueries";
import CompanyCommentFormPresenter from "./CompanyCommentFormPresenter";
import useMe from "../../../Hooks/useMe";

export default function ({
  companyPostId,
  companyPostCommentId,
  reCommentScreen,
  handleComment,
  handleReComment,
  commentUploading,
}) {
  const { t } = useTranslation();
  const { data: userData } = useMe();
  const navigation = useNavigation();
  const updateComment = async (cache, result) => {
    const {
      data: { createCompanyPostComment },
    } = result;
    if (createCompanyPostComment && userData?.me) {
      const newComment = {
        __typename: "CompanyPostComment",
        createdAt: createCompanyPostComment?.createdAt,
        id: createCompanyPostComment?.id,
        isMine: true,
        payload: createCompanyPostComment?.payload,
        user: {
          ...userData?.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName3 on CompanyPostComment {
            id
            createdAt
            isMine
            payload
            user {
              id
              username
              avatarUrl
            }
          }
        `,
      });

      const CompanyPostId = `CompanyPost:${companyPostId}`;
      cache.modify({
        id: CompanyPostId,
        fields: {
          companyPostComments() {
            return newCacheComment;
          },
          totalCompanyPostComments(prev) {
            return prev + 1;
          },
        },
      });
    }
    handleComment();
    Keyboard.dismiss();
  };

  const updateReComment = (cache, result) => {
    const {
      data: { createCompanyPostReComment },
    } = result;
    if (createCompanyPostReComment && userData?.me) {
      const newComment = {
        __typename: "CompanyPostReComment",
        createdAt: createCompanyPostReComment?.createdAt,
        id: createCompanyPostReComment?.id,
        isMine: true,
        payload: createCompanyPostReComment?.payload,
        user: {
          ...userData?.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName4 on CompanyPostReComment {
            id
            createdAt
            isMine
            payload
            user {
              id
              username
              avatarUrl
            }
          }
        `,
      });
      const CompanyPostCommentId = `CompanyPostComment:${companyPostCommentId}`;
      cache.modify({
        id: CompanyPostCommentId,
        fields: {
          companyPostReComments() {
            return newCacheComment;
          },
        },
      });
      const CompanyPostId = `CompanyPost:${companyPostId}`;
      cache.modify({
        id: CompanyPostId,
        fields: {
          totalCompanyPostComments(prev) {
            return prev + 1;
          },
        },
      });
      handleReComment();
      Keyboard.dismiss();
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: updateComment,
      onError: (error) => {
        if (error.message === "100") {
          Alert.alert(t("alert.1"));
        } else {
          Alert.alert(t("alert.4"));
        }
        navigation.pop();
      },
    }
  );

  const [createReCommentMutation, { loading: ReCommentLoading }] = useMutation(
    CREATE_RECOMMENT_MUTATION,
    {
      update: updateReComment,
      onError: (error) => {
        if (error.message === "100") {
          Alert.alert(t("alert.3"));
        } else {
          Alert.alert(t("alert.4"));
        }
        navigation.pop();
      },
    }
  );
  return (
    <CompanyCommentFormPresenter
      companyPostId={companyPostId}
      companyPostCommentId={companyPostCommentId}
      createCommentMutation={createCommentMutation}
      createReCommentMutation={createReCommentMutation}
      reCommentScreen={reCommentScreen}
      loading={loading}
      ReCommentLoading={ReCommentLoading}
      commentUploading={commentUploading}
    />
  );
}
