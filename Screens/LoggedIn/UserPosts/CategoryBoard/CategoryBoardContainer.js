import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../../Components/ScreenLayout";
import CategoryUserPost from "../../../../Components/Post/CategoryUserPost";
import { categories, ScreenNames } from "../../../../Constant";
import { CATEGORY_BOARD_QUERY } from "./CategoryBoardQueries";
import CategoryBoardPresenter from "./CategoryBoardPresenter";

export default function ({ route: { params } }) {
  const { i18n } = useTranslation();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(CATEGORY_BOARD_QUERY, {
    variables: {
      categoryId: params.categoryId,
      offset: 0,
    },
  });
  const { width, height } = useWindowDimensions();

  const renderPost = ({ item }) => {
    if (!item.isBlocking) {
      return <CategoryUserPost {...item} />;
    } else {
      return;
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleFetch = async () => {
    if (loading) {
      return;
    } else {
      setFetchLoading(true);
      await fetchMore({
        variables: {
          offset: data?.seeUserCategoryPost?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const goToUserPostForm = () => {
    return navigation.navigate("UserPostUploadForm", {
      categoryId: params.categoryId,
      screenName: ScreenNames.CATEGORY_BOARD,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: categories.map((item) => {
        if (params.categoryId === item.id) {
          return i18n.language === "vn"
            ? item.categoryVn
            : i18n.language === "en"
            ? item.categoryEn
            : item.categoryKo;
        }
      }),
    });

    if (params?.fromWhere === ScreenNames.CATEGORY_BOARD) {
      navigation.navigate("UserPostListDetail", {
        id: params?.id,
      });
    }
  }, [params]);

  return (
    <ScreenLayout loading={loading}>
      <CategoryBoardPresenter
        width={width}
        height={height}
        categoryId={params.categoryId}
        goToUserPostForm={goToUserPostForm}
        handleFetch={handleFetch}
        refreshing={refreshing}
        refresh={refresh}
        data={data}
        renderPost={renderPost}
        fetchLoading={fetchLoading}
      />
    </ScreenLayout>
  );
}
