import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { FOLLOWERS_QUERY } from "./FollowersQueries";
import FollowersPresenter from "./FollowersPresenter";
import FollowingList from "../../../../Components/Profile/FollowingList";

export default function ({ id }) {
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(FOLLOWERS_QUERY, {
    variables: {
      userId: parseInt(id),
      offset: 0,
    },
  });
  const renderPost = ({ item }) => <FollowingList {...item} />;

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
          offset: data?.seeFollowers?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, []);

  return (
    <ScreenLayout loading={loading}>
      <FollowersPresenter
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
