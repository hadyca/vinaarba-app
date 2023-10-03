import React from "react";
import styled from "styled-components/native";
import { colors } from "../Colors";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvatarView = styled.View`
  margin-right: 10px;
  border-radius: 12.5px;
  border: 0.5px solid ${colors.avatarBorder};
`;

const Avatar = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

const Username = styled.Text`
  color: ${colors.black};
  font-weight: 600;
`;

export default function UserAvatar({ username, uri }) {
  return (
    <Container>
      {uri ? (
        <AvatarView>
          <Avatar resizeMode="cover" source={{ uri: uri }} />
        </AvatarView>
      ) : (
        <AvatarView>
          <Avatar
            resizeMode="cover"
            source={require("../assets/blankProfile.png")}
          />
        </AvatarView>
      )}
      <Username>{username}</Username>
    </Container>
  );
}
