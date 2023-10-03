import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const FetchView = styled.View`
  bottom: 30px;
`;
export default function FollowingPresenter({
  handleFetch,
  refreshing,
  refresh,
  data,
  renderPost,
  fetchLoading,
}) {
  return (
    <>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={handleFetch}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFollowing}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderPost}
      />
      {fetchLoading ? (
        <FetchView>
          <ActivityIndicator color="black" />
        </FetchView>
      ) : null}
    </>
  );
}
