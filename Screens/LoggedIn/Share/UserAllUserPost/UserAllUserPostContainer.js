import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { USERPOST_QUERY } from "./UserAllUserPostQueries";
import UserAllUserPostPresenter from "./UserAllUserPostPresenter";
import UserPost from "../../../../Components/Post/UserPost";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigation = useNavigation();
  const { data, loading, refetch, fetchMore } = useQuery(USERPOST_QUERY, {
    variables: {
      userId: parseInt(params.id),
      offset: 0,
    },
  });

  const renderPost = ({ item }) => {
    return <UserPost {...item} />;
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
          offset: data?.seeUserAllPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      // title: loading ? "Loading..." : params.username,
      title: params.username,
    });
  }, [params]);

  return (
    <ScreenLayout loading={loading}>
      <UserAllUserPostPresenter
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
