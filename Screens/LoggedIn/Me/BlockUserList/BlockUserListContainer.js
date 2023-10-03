import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { BLOCKING_QUERY } from "./BlockUserListQueries";
import BlockUserListPresenter from "./BlockUserListPresenter";
import BlockingList from "../../../../Components/Profile/BlockingList";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(BLOCKING_QUERY, {
    variables: {
      userId: parseInt(params.userId),
      offset: 0,
    },
  });

  const renderPost = ({ item }) => <BlockingList {...item} />;

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
          offset: data?.seeBlocking?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      refetch();
    }
  }, []);

  return (
    <ScreenLayout loading={loading}>
      <BlockUserListPresenter
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
