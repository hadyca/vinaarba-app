import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { POST_QUERY } from "./UserPostListQueries";
import { useNavigation } from "@react-navigation/native";
import UserPostListPresenter from "./UserPostListPresenter";
import UserPost from "../../../../Components/Post/UserPost";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { ScreenNames } from "../../../../Constant";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(POST_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const goToUserPostForm = () => {
    return navigation.navigate("UserPostUploadForm", {
      screenName: ScreenNames.USER_POST_LIST,
    });
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
          offset: data?.seeAllUserPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const goToCategoryScreen = (categoryId) => {
    navigation.navigate("CategoryBoard", {
      categoryId,
    });
  };

  const renderPost = ({ item }) => {
    if (!item.isBlocking) {
      return <UserPost {...item} />;
    } else {
      return;
    }
  };

  useEffect(() => {
    if (params?.fromWhere === ScreenNames.USER_POST_LIST) {
      navigation.navigate("UserPostListDetail", {
        id: params?.id,
      });
    }
  }, [params]);

  return (
    <ScreenLayout loading={loading}>
      <UserPostListPresenter
        goToUserPostForm={goToUserPostForm}
        refreshing={refreshing}
        refresh={refresh}
        handleFetch={handleFetch}
        goToCategoryScreen={goToCategoryScreen}
        data={data}
        fetchLoading={fetchLoading}
        renderPost={renderPost}
      />
    </ScreenLayout>
  );
}
