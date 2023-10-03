import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { colors } from "../../Colors";
import { timeForToday } from "../../Utils";
import UserAvatar from "../UserAvatar";
import { categories } from "../../Constant";

const Container = styled.View``;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Header = styled.TouchableOpacity`
  margin: 10px;
`;

const CategoryView = styled.View`
  margin-left: 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: flex-start;
`;
const CategoryTouch = styled.TouchableOpacity``;

const CategoryText = styled.Text`
  font-size: 11px;
  padding: 5px 10px;
  background-color: ${colors.borderThin};
  font-weight: 600;
  text-align: center;
`;

const Contents = styled.TouchableOpacity`
  margin-left: 10px;
  margin-top: 8px;
`;

const ImgContainer = styled.TouchableOpacity`
  margin-top: 8px;
`;

const MainImg = styled.Image`
  margin-top: 5px;
  width: ${(props) => props.width}px;
  height: ${(props) => Math.ceil(props.height / 3)}px;
`;

const ContentText = styled.Text`
  margin-top: 5px;
  font-size: 14px;
  color: ${colors.black};
`;

const MoreText = styled.Text`
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

function UserPost({
  id,
  user,
  file,
  content,
  categoryId,
  totalUserPostLikes,
  totalUserPostComments,
  createdAt,
}) {
  const { t, i18n } = useTranslation();

  const { width, height } = useWindowDimensions();

  const time = timeForToday(parseInt(createdAt));

  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
    });
  };

  const goToCategoryScreen = (categoryId) => {
    navigation.navigate("CategoryBoard", {
      categoryId,
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
          <UserAvatar username={user.username} uri={user.avatarUrl} />
        </Header>
      </HeaderContainer>
      <CategoryView>
        <CategoryTouch onPress={() => goToCategoryScreen(categoryId)}>
          {categories.map((item, index) => {
            if (categoryId === item.id) {
              return (
                <CategoryText key={index}>
                  {i18n.language === "vn"
                    ? item.categoryVn
                    : i18n.language === "en"
                    ? item.categoryEn
                    : item.categoryKo}
                </CategoryText>
              );
            }
          })}
        </CategoryTouch>
      </CategoryView>
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
          {i18n.language === "en" && totalUserPostLikes > 1
            ? `${totalUserPostLikes} ${t("userPostList.2")}s`
            : `${totalUserPostLikes} ${t("userPostList.2")}`}
        </Likes>
        <Comments>
          {i18n.language === "en" && totalUserPostComments > 1
            ? `${totalUserPostComments} ${t("userPostList.3")}s`
            : `${totalUserPostComments} ${t("userPostList.3")}`}
        </Comments>
      </LikeComment>
      <Date>{time}</Date>
      <Separator />
    </Container>
  );
}

export default React.memo(UserPost);
