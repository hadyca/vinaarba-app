import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { USERPOST_QUERY } from "./FavoriteUserPostPostQueries";
import FavoriteUserPostPresenter from "./FavoriteUserPostPresenter";
import UserPost from "../../../../Components/Post/UserPost";

export default function () {
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(USERPOST_QUERY, {
    variables: {
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
          offset: data?.seeFavoriteUserPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  return (
    <ScreenLayout loading={loading}>
      <FavoriteUserPostPresenter
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
