import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import UserAvatar from "../UserAvatar";
import Separator from "../Separator";
import ImageSlider from "./ImageSlider";
import { colors } from "../../Colors";
import { categories } from "../../Constant";

const Container = styled.View`
  margin: 10px;
`;

const CategoryView = styled.View`
  margin-bottom: 10px;
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

const Header = styled.TouchableOpacity``;
const Contents = styled.View``;

const Content = styled.Text`
  margin-top: 10px;
  font-size: 14px;
`;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;

export default function PostContents({
  file,
  userId,
  username,
  avatarUrl,
  content,
  categoryId,
  toggleLikeMutation,
  likeLoading,
  isLiked,
}) {
  const { i18n } = useTranslation();
  const navigation = useNavigation();

  const goToCategoryScreen = (categoryId) => {
    navigation.navigate("CategoryBoard", {
      categoryId,
    });
  };

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: userId,
    });
  };

  return (
    <>
      {file?.length !== 0 ? <ImageSlider file={file} /> : null}
      <Container>
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
        <Header onPress={goToProfile}>
          <UserAvatar username={username} uri={avatarUrl} />
        </Header>
        <Separator />
        <Contents>
          <Content>{content}</Content>
        </Contents>
        <Actions>
          {likeLoading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Action onPress={toggleLikeMutation}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                color={isLiked ? "tomato" : "black"}
                size={22}
              />
            </Action>
          )}
        </Actions>
        <Separator />
      </Container>
    </>
  );
}
