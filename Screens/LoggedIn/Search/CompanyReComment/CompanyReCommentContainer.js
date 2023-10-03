import React, { useEffect, useState } from "react";
import { Alert, NativeModules } from "react-native";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CompanyReCommentPresenter from "./CompanyReCommentPresenter";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { COMMENT_QUERY } from "./CompanyReCommentQueries";

export default function ({ route: { params } }) {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { StatusBarManager } = NativeModules;
  const navigation = useNavigation();
  const { data, refetch, loading } = useQuery(COMMENT_QUERY, {
    variables: {
      companyPostCommentId: parseInt(params.id),
    },
    onError: (error) => {
      if (error.message === "100") {
        Alert.alert(t("alert.3"));
      } else {
        Alert.alert(t("alert.4"));
      }
      navigation.pop();
    },
  });
  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const refresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <CompanyReCommentPresenter
        refreshing={refreshing}
        refresh={refresh}
        data={data}
        companyPostId={params.companyPostId}
        id={params.id}
        statusBarHeight={statusBarHeight}
      />
    </ScreenLayout>
  );
}
