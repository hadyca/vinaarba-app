import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { NOTIFICATION_QUERY } from "./NotificationQueries";
import NotificationPresenter from "./NotificationPresenter";
import ScreenLayout from "../../../../Components/ScreenLayout";
import NotificationList from "../../../../Components/Profile/NotificationList";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(NOTIFICATION_QUERY, {
    variables: {
      offset: 0,
    },
  });

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
          offset: data?.seeAllNotification?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const renderNotification = ({ item }) => {
    return <NotificationList {...item} />;
  };

  useEffect(() => {
    if (params?.isAlert) {
      refetch();
    } else {
      return;
    }
  }, [params]);

  return (
    <ScreenLayout loading={loading}>
      <NotificationPresenter
        refreshing={refreshing}
        refresh={refresh}
        handleFetch={handleFetch}
        data={data}
        fetchLoading={fetchLoading}
        renderNotification={renderNotification}
      />
    </ScreenLayout>
  );
}
