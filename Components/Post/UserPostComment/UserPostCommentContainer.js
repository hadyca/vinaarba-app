import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { useTranslation } from "react-i18next";
import UserPostCommentPresenter from "./UserPostCommentPresenter";
import { DELETE_COMMENT_MUTATION } from "./UserPostCommentQueries";
import { timeForToday } from "../../../Utils";

export default function ({
  userPostId,
  id,
  user,
  payload,
  isMine,
  createdAt,
  reComments,
  reCommentScreen,
}) {
  const { t } = useTranslation();
  const deleteUserComment = (cache, result) => {
    const {
      data: {
        deleteUserPostComment: { ok, totalRecomments },
      },
    } = result;
    if (ok) {
      const CommentId = `UserPostComment:${id}`;
      const UserPostId = `UserPost:${userPostId}`;
      cache.evict({
        id: CommentId,
      });

      cache.modify({
        id: UserPostId,
        fields: {
          totalUserPostComments(prev) {
            return prev - (1 + totalRecomments);
          },
        },
      });
    }
  };

  const [deleteUserCommentMutation, { loading }] = useMutation(
    DELETE_COMMENT_MUTATION,
    {
      update: deleteUserComment,
    }
  );

  let myActionsheet = useRef();
  let notMeActionsheet = useRef();

  let myOptionArray = [
    t("userPostListDetail.2"),
    t("userPostListDetail.3"),
    t("userPostListDetail.4"),
  ];
  let notMineOptionArray = [
    t("userPostListDetail.8"),
    t("userPostListDetail.4"),
  ];

  const navigation = useNavigation();

  const showActionSheet = () => {
    if (isMine) {
      return myActionsheet.current.show();
    } else {
      return notMeActionsheet.current.show();
    }
  };

  const goToEditCommentForm = () => {
    navigation.navigate("EditUserPostCommentForm", {
      commentId: id,
      payload,
    });
  };

  const goToDeleteComment = () => {
    deleteUserCommentMutation({
      variables: {
        commentId: parseInt(id),
      },
    });
  };

  const goToReportForm = () => {
    navigation.navigate("UserPostCommentReportForm", {
      id,
    });
  };

  const myHandleIndex = (index) => {
    if (index === 0) {
      goToEditCommentForm();
    } else if (index === 1) {
      Alert.alert(t("userPostListDetail.15"), "", [
        { text: t("userPostListDetail.4") },
        {
          text: t("userPostListDetail.14"),
          onPress: () => goToDeleteComment(),
        },
      ]);
    } else {
      return;
    }
  };

  const notMineHandleIndex = (index) => {
    if (index === 0) {
      goToReportForm();
    } else {
      return;
    }
  };

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
    });
  };

  const goToReComment = () => {
    navigation.navigate("ReComment", {
      userPostId,
      id,
      user,
      payload,
      isMine,
      createdAt,
      reComments,
    });
  };

  const time = timeForToday(parseInt(createdAt));

  return (
    <>
      <UserPostCommentPresenter
        goToProfile={goToProfile}
        user={user}
        showActionSheet={showActionSheet}
        payload={payload}
        time={time}
        reCommentScreen={reCommentScreen}
        goToReComment={goToReComment}
        reComments={reComments}
        userPostId={userPostId}
      />
      <ActionSheet
        ref={myActionsheet}
        options={myOptionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => myHandleIndex(index)}
      />
      <ActionSheet
        ref={notMeActionsheet}
        options={notMineOptionArray}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index) => notMineHandleIndex(index)}
      />
    </>
  );
}
