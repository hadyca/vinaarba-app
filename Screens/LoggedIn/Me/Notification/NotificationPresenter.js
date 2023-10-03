import React, { useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { FlatList, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

const FetchView = styled.View`
  bottom: 35px;
`;

export default function NotificationPresenter({
  refreshing,
  refresh,
  handleFetch,
  data,
  fetchLoading,
  renderNotification,
}) {
  const ref = useRef(null);
  useScrollToTop(ref);
  return (
    <Container>
      <FlatList
        ref={ref}
        onEndReachedThreshold={0.05}
        onEndReached={handleFetch}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeAllNotification}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderNotification}
      />
      {fetchLoading ? (
        <FetchView>
          <ActivityIndicator color="black" />
        </FetchView>
      ) : null}
    </Container>
  );
}
