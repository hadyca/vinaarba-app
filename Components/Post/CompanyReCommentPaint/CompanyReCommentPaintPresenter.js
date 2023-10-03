import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../Colors";
import UserAvatar from "../../UserAvatar";

const Container = styled.View`
  margin-left: 35px;
  margin-top: 20px;
`;
const HeaderContainer = styled.View`
  justify-content: center;
`;
const Header = styled.TouchableOpacity``;

const CommentView = styled.View`
  margin-top: 2px;
  margin-left: 35px;
`;

const CommentPayLoad = styled.Text`
  font-size: 14px;
  padding-right: 30px;
`;

const IconView = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  padding: 10px;
`;

const SubContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const Date = styled.Text`
  margin-top: 3px;
  margin-left: 35px;
  color: ${colors.greyText};
  font-size: 12px;
`;

const ReplyButton = styled.TouchableOpacity`
  margin-top: 3px;
  margin-left: 5px;
`;

const ReplyText = styled.Text`
  color: ${colors.greyText};
  font-size: 12px;
  font-weight: 600;
`;

export default function CompanyReCommentPaintPresenter({
  goToProfile,
  user,
  showActionSheet,
  payload,
  time,
}) {
  return (
    <Container>
      <HeaderContainer>
        <Header onPress={goToProfile}>
          <UserAvatar username={user.username} uri={user.avatarUrl} />
        </Header>
        <IconView onPress={showActionSheet}>
          <Ionicons name="ellipsis-vertical" color="grey" size={14} />
        </IconView>
      </HeaderContainer>
      <CommentView>
        <CommentPayLoad>{payload}</CommentPayLoad>
      </CommentView>
      <SubContainer>
        <Date>{time}</Date>
      </SubContainer>
    </Container>
  );
}
