import React, { useEffect, useState, useRef } from "react";
import { Platform, NativeModules, Alert, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { useTranslation } from "react-i18next";
import {
  POST_DETAIL_QUERY,
  DELETE_COMPANYPOST_MUTATION,
  TOGGLE_COMPANYPOST_LIKE_MUTATION,
  TOGGLE_COMPANYPOST_FAVORITE_MUTATION,
} from "./CompanyPostDetailQueries";
import CompanyPostDetailPresenter from "./CompanyPostDetailPresenter";
import CompanyPostComment from "../../../../Components/Post/CompanyPostComment";
import ScreenLayout from "../../../../Components/ScreenLayout";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const navigation = useNavigation();
  const { data: userData } = useMe();

  const { StatusBarManager } = NativeModules;

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleCompanyPostLike: { ok },
      },
    } = result;
    if (ok) {
      const CompanyPostId = `CompanyPost:${params.id}`;
      cache.modify({
        id: CompanyPostId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          totalCompanyPostLikes(prev) {
            if (data?.seeCompanyPost?.isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const updateToggleFavorite = (cache, result) => {
    const {
      data: { toggleFavoriteCompanyPost },
    } = result;
    if (toggleFavoriteCompanyPost.id) {
      const CompanyPostId = `CompanyPost:${params.id}`;
      cache.modify({
        id: CompanyPostId,
        fields: {
          isFavorite(prev) {
            return !prev;
          },
        },
      });
      if (data?.seeCompanyPost?.isFavorite) {
        cache.evict({
          id: "ROOT_QUERY",
          fieldName: "seeFavoriteCompanyPosts",
        });
        Alert.alert(t("userPostListDetail.10"));
      } else {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeFavoriteCompanyPosts(prev) {
              return [toggleFavoriteCompanyPost, ...prev];
            },
          },
        });
        Alert.alert(t("userPostListDetail.11"));
      }
    }
  };

  const updateDeleteCompanyPost = (cache, result) => {
    const {
      data: {
        deleteCompanyPost: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "seeAllCompanyPosts",
      });
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "seeCompanyAllPosts",
      });
      const { me } = userData;
      const UserId = `User:${me.id}`;
      cache.modify({
        id: UserId,
        fields: {
          totalCompanyPosts(prev) {
            return prev - 1;
          },
        },
      });
    }
    Alert.alert(t("userPostListDetail.10"));
    navigation.pop();
  };
  const { data, loading, refetch } = useQuery(POST_DETAIL_QUERY, {
    variables: {
      companyPostId: parseInt(params.id),
    },
    onError: (error) => {
      if (error.message === "100") {
        Alert.alert(t("alert.1"));
      } else {
        Alert.alert(t("alert.4"));
      }
      navigation.pop();
    },
  });
  const [deleteCompanyPostMutation] = useMutation(DELETE_COMPANYPOST_MUTATION, {
    update: updateDeleteCompanyPost,
  });

  const [toggleCompanyPostLikeMutation, { loading: likeLoading }] = useMutation(
    TOGGLE_COMPANYPOST_LIKE_MUTATION,
    {
      variables: {
        companyPostId: parseInt(params.id),
      },
      update: updateToggleLike,
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

  const [toggleCompanyPostFavoriteMutation] = useMutation(
    TOGGLE_COMPANYPOST_FAVORITE_MUTATION,
    {
      update: updateToggleFavorite,
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

  const renderComment = ({ item }) => {
    return (
      <CompanyPostComment
        companyPostId={parseInt(params.id)}
        id={item.id}
        user={item.user}
        payload={item.payload}
        isMine={item.isMine}
        createdAt={item.createdAt}
        reComments={item.companyPostReComments}
      />
    );
  };

  const refresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const goToEditForm = () => {
    navigation.navigate("EditCompanyPostForm", {
      id: params.id,
      title: data?.seeCompanyPost?.title,
      content: data?.seeCompanyPost?.content,
      file: data?.seeCompanyPost?.file,
      workingDay: data?.seeCompanyPost?.workingDay,
      dayOption: data?.seeCompanyPost?.dayOption,
      startTime: data?.seeCompanyPost?.startTime,
      finishTime: data?.seeCompanyPost?.finishTime,
      timeOption: data?.seeCompanyPost?.timeOption,
      wageTypeId: data?.seeCompanyPost?.wageTypeId,
      wage: data?.seeCompanyPost?.wage,
      contactNumber: data?.seeCompanyPost?.contactNumber,
      email: data?.seeCompanyPost?.email,
    });
  };

  const goToReportForm = () => {
    navigation.navigate("CompanyPostReportForm", {
      id: params.id,
    });
  };

  const goToDeletePost = () => {
    deleteCompanyPostMutation({
      variables: {
        companyPostId: parseInt(params.id),
      },
    });
  };

  const goToToggleFavorite = () => {
    toggleCompanyPostFavoriteMutation({
      variables: {
        companyPostId: parseInt(params.id),
      },
    });
  };

  //Action Sheet
  let myActionsheet = useRef();
  let myOptionArray = [
    t("userPostListDetail.2"),
    t("userPostListDetail.3"),
    t("userPostListDetail.4"),
  ];

  let notMeActionsheet1 = useRef();
  let notMineOptionArray1 = [
    t("userPostListDetail.7"),
    t("userPostListDetail.8"),
    t("userPostListDetail.4"),
  ];

  let notMeActionsheet2 = useRef();
  let notMineOptionArray2 = [
    t("userPostListDetail.9"),
    t("userPostListDetail.8"),
    t("userPostListDetail.4"),
  ];

  const showActionSheet = () => {
    if (data?.seeCompanyPost?.isMine) {
      return myActionsheet.current.show();
    } else if (data?.seeCompanyPost?.isFavorite) {
      return notMeActionsheet2.current.show();
    } else {
      return notMeActionsheet1.current.show();
    }
  };

  const myHandleIndex = (index) => {
    if (index === 0) {
      goToEditForm();
    } else if (index === 1) {
      Alert.alert(t("userPostListDetail.5"), "", [
        { text: t("userPostListDetail.4") },
        {
          text: t("userPostListDetail.14"),
          onPress: () => goToDeletePost(),
        },
      ]);
    } else {
      return;
    }
  };

  const notMineHandleIndex1 = (index) => {
    if (index === 0) {
      Alert.alert(t("userPostListDetail.12"), "", [
        { text: t("userPostListDetail.4") },
        {
          text: t("userPostListDetail.14"),
          onPress: () => goToToggleFavorite(),
        },
      ]);
    } else if (index === 1) {
      goToReportForm();
    } else {
      return;
    }
  };

  const notMineHandleIndex2 = (index) => {
    if (index === 0) {
      Alert.alert(t("userPostListDetail.13"), "", [
        { text: t("userPostListDetail.4") },
        {
          text: t("userPostListDetail.14"),
          onPress: () => goToToggleFavorite(),
        },
      ]);
    } else if (index === 1) {
      goToReportForm();
    } else {
      return;
    }
  };

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const HeaderRight = () => (
    <TouchableOpacity onPress={showActionSheet}>
      <Ionicons
        name="ellipsis-vertical"
        color="grey"
        size={18}
        style={{ paddingLeft: 10, paddingRight: 10 }}
      />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: !loading && HeaderRight,
    });
  }, [data]);

  useEffect(() => {
    if (params.refresh === "refresh") {
      refetch();
    }
  }, [params]);

  return (
    <ScreenLayout loading={loading}>
      <CompanyPostDetailPresenter
        data={data}
        likeLoading={likeLoading}
        toggleCompanyPostLikeMutation={toggleCompanyPostLikeMutation}
        renderComment={renderComment}
        refreshing={refreshing}
        refresh={refresh}
        statusBarHeight={statusBarHeight}
        companyPostId={params.id}
        fromWhere={params.fromWhere}
      />
      <ActionSheet
        ref={myActionsheet}
        options={myOptionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => myHandleIndex(index)}
      />
      <ActionSheet
        ref={notMeActionsheet1}
        options={notMineOptionArray1}
        cancelButtonIndex={2}
        destructiveButtonIndex={0}
        onPress={(index) => notMineHandleIndex1(index)}
      />
      <ActionSheet
        ref={notMeActionsheet2}
        options={notMineOptionArray2}
        cancelButtonIndex={2}
        destructiveButtonIndex={0}
        onPress={(index) => notMineHandleIndex2(index)}
      />
    </ScreenLayout>
  );
}
