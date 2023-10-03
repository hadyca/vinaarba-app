import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { COMPANYPOST_QUERY } from "./UserAllCompanyPostQueries";
import UserAllCompanyPostPresenter from "./UserAllCompanyPostPresenter";
import FavoriteCompanyPost from "../../../../Components/Post/FavoriteCompanyPost";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigation = useNavigation();
  const { data, loading, refetch, fetchMore } = useQuery(COMPANYPOST_QUERY, {
    variables: {
      companyId: parseInt(params.id),
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
          offset: data?.seeCompanyAllPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: params.companyName,
    });
  }, [params]);

  return (
    <ScreenLayout loading={loading}>
      <UserAllCompanyPostPresenter
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
