import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { useTranslation } from "react-i18next";
import { timeForToday } from "../../../Utils";
import CompanyReCommentPaintPresenter from "./CompanyReCommentPaintPresenter";
import { DELETE_COMMENT_MUTATION } from "./CompanyReCommentPaintQueries";

export default function ({
  id,
  companyPostId,
  user,
  payload,
  isMine,
  createdAt,
}) {
  const { t } = useTranslation();
  const deleteCompanyComment = (cache, result) => {
    const {
      data: {
        deleteCompanyPostReComment: { ok },
      },
    } = result;
    if (ok) {
      const ReCommentId = `CompanyPostReComment:${id}`;
      const CompanyPostId = `CompanyPost:${companyPostId}`;
      cache.evict({
        id: ReCommentId,
      });
      cache.modify({
        id: CompanyPostId,
        fields: {
          totalCompanyPostComments(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteCompanyReCommentMutation, { loading }] = useMutation(
    DELETE_COMMENT_MUTATION,
    {
      update: deleteCompanyComment,
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
    navigation.navigate("EditCompanyPostReCommentForm", {
      reCommentId: id,
      payload,
    });
  };

  const goToDeleteComment = () => {
    deleteCompanyReCommentMutation({
      variables: {
        reCommentId: parseInt(id),
      },
    });
  };

  const goToReportForm = () => {
    navigation.navigate("CompanyPostReCommentReportForm", {
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

  const time = timeForToday(parseInt(createdAt));

  return (
    <>
      <CompanyReCommentPaintPresenter
        goToProfile={goToProfile}
        user={user}
        showActionSheet={showActionSheet}
        payload={payload}
        time={time}
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
