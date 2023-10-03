import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { COMPANYPOST_QUERY } from "./FavoriteCompanyPostQueries";
import FavoriteCompanyPostPresenter from "./FavoriteCompanyPostPresenter";
import FavoriteCompanyPost from "../../../../Components/Post/FavoriteCompanyPost";

export default function () {
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(COMPANYPOST_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const renderPost = ({ item }) => {
    return <FavoriteCompanyPost {...item} />;
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
          offset: data?.seeFavoriteCompanyPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  return (
    <ScreenLayout loading={loading}>
      <FavoriteCompanyPostPresenter
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
