import React from "react";
import { RefreshControl } from "react-native";
import styled from "styled-components/native";
import ProfileContents from "../../../../Components/Profile/ProfileContents";

const Container = styled.ScrollView``;

export default function ProfilePresenter({ refreshing, refresh, data }) {
  return (
    <Container
      shshowsVerticalScrollIndicator={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <ProfileContents data={data} />
    </Container>
  );
}
