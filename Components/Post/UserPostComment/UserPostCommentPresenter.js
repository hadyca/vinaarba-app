import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { colors } from "../../../Colors";
import UserAvatar from "../../UserAvatar";
import ReCommentPaint from "../ReCommentPaint";

const Container = styled.View`
  margin: 10px;
`;
const HeaderContainer = styled.View`
  justify-content: center;
`;
const Header = styled.TouchableOpacity``;

const CommentView = styled.View`
  margin-top: 2px;
  margin-left: 35px;
`;

const CommentPayload = styled.Text`
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
  font-weight: bold;
`;

export default function UserPostCommentPresenter({
  goToProfile,
  user,
  showActionSheet,
  payload,
  time,
  reCommentScreen,
  goToReComment,
  reComments,
  userPostId,
}) {
  const { t } = useTranslation();
  return (
    <Container>
      <HeaderContainer>
        <Header onPress={goToProfile}>
          <UserAvatar username={user?.username} uri={user?.avatarUrl} />
        </Header>
        {!reCommentScreen ? (
          <IconView onPress={showActionSheet}>
            <Ionicons name="ellipsis-vertical" color="grey" size={14} />
          </IconView>
        ) : null}
      </HeaderContainer>
      <CommentView>
        <CommentPayload>{payload}</CommentPayload>
      </CommentView>
      <SubContainer>
        <Date>{time}</Date>
        {!reCommentScreen ? (
          <ReplyButton onPress={goToReComment}>
            <ReplyText>{t("userPostListDetail.6")}</ReplyText>
          </ReplyButton>
        ) : null}
      </SubContainer>
      {reComments?.length > 0
        ? reComments.map((item, index) => (
            <ReCommentPaint
              key={index}
              user={item.user}
              payload={item.payload}
              isMine={item.isMine}
              createdAt={item.createdAt}
              id={item.id}
              userPostId={userPostId}
            />
          ))
        : null}
    </Container>
  );
}
