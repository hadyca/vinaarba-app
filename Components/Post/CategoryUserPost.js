import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { colors } from "../../Colors";
import { timeForToday } from "../../Utils";
import UserAvatar from "../UserAvatar";

const Container = styled.View``;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Header = styled.TouchableOpacity`
  margin: 10px;
`;

const Contents = styled.TouchableOpacity`
  margin-left: 10px;
`;

const ImgContainer = styled.TouchableOpacity`
  margin-top: 8px;
`;

const MainImg = styled.Image`
  margin-top: 5px;
  width: ${(props) => props.width}px;
  height: ${(props) => Math.ceil(props.height / 3)}px;
`;

const Content = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

const ContentText = styled.Text`
  font-size: 14px;
  color: ${colors.black};
`;

const MoreText = styled.Text`
  margin-left: 5px;
  font-size: 12px;
  color: ${colors.greyText};
`;

const LikeComment = styled.View`
  margin-left: 10px;
  flex-direction: row;
  margin-top: 5px;
`;

const Likes = styled.Text`
  margin-right: 5px;
  color: ${colors.greyText};
  font-size: 12px;
`;

const Comments = styled.Text`
  color: ${colors.greyText};
  font-size: 12px;
`;

const Date = styled.Text`
  margin-top: 3px;
  margin-left: 10px;
  color: ${colors.greyText};
  font-size: 10px;
`;

const Separator = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${colors.borderThin};
  margin-top: 10px;
`;

function CategoryUserPost({
  id,
  user,
  file,
  content,
  totalUserPostLikes,
  totalUserPostComments,
  createdAt,
}) {
  const { t } = useTranslation();

  const { width, height } = useWindowDimensions();

  const time = timeForToday(parseInt(createdAt));

  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
    });
  };

  const goToPostDetail = () => {
    navigation.navigate("UserPostListDetail", {
      id,
    });
  };

  return (
    <Container>
      <HeaderContainer>
        <Header onPress={goToProfile}>
          <UserAvatar username={user?.username} uri={user?.avatarUrl} />
        </Header>
      </HeaderContainer>
      {file?.length > 0 ? (
        <ImgContainer onPress={goToPostDetail}>
          <MainImg
            resizeMode="cover"
            source={{ uri: file[0].fileUrl }}
            width={width}
            height={height}
          />
        </ImgContainer>
      ) : null}
      <Contents onPress={goToPostDetail}>
        {content.length >= 60 ? (
          <ContentText>
            {content.substring(0, 60)}
            <MoreText> ...{t("userPostList.1")}</MoreText>
          </ContentText>
        ) : (
          <ContentText>{content}</ContentText>
        )}
      </Contents>
      <LikeComment>
        <Likes>
          {totalUserPostLikes > 1
            ? `${totalUserPostLikes} likes`
            : `${totalUserPostLikes} like`}
        </Likes>
        <Comments>
          {totalUserPostComments > 1
            ? `${totalUserPostComments} comments`
            : `${totalUserPostComments} comment`}
        </Comments>
      </LikeComment>
      <Date>{time}</Date>
      <Separator />
    </Container>
  );
}

export default React.memo(CategoryUserPost);
