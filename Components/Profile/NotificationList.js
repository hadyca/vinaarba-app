import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { colors } from "../../Colors";
import { timeForToday } from "../../Utils";

const Container = styled.TouchableOpacity`
  margin: 10px;
`;

const TopContainer = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Type = styled.Text`
  font-size: 13px;
  color: ${colors.buttonBackground};
`;
const AvatarView = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Avatar = styled.Image`
  width: 43px;
  height: 43px;
  border-radius: 30px;
`;
const ContentText = styled.Text`
  flex-shrink: 1;
  color: ${colors.black};
`;

const Date = styled.Text`
  color: ${colors.greyText};
  font-size: 12px;
`;

const Separator = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${colors.borderThin};
`;

function NotificationList({ user, contentId, createdAt, type, postId }) {
  const { t } = useTranslation();

  const time = timeForToday(parseInt(createdAt));

  const navigation = useNavigation();

  const goToPostDetail = (type) => {
    if (type === "userPost") {
      navigation.navigate("UserPostListDetail", {
        id: postId,
      });
    } else if (type === "companyPost") {
      navigation.navigate("CompanyPostListDetail", {
        id: postId,
      });
    } else if (type === "following") {
      navigation.navigate("Profile", {
        id: user.id,
      });
    }
  };

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: user.id,
    });
  };

  return (
    <>
      <Container onPress={() => goToPostDetail(type)}>
        <TopContainer>
          {type === "userPost" ? (
            <Type>{t("notification.4")}</Type>
          ) : type === "companyPost" ? (
            <Type>{t("notification.5")}</Type>
          ) : type === "following" ? (
            <Type>{t("notification.6")}</Type>
          ) : (
            <Type>{t("notification.7")}</Type>
          )}
          <Date>{time}</Date>
        </TopContainer>
        <BottomContainer>
          <AvatarView onPress={goToProfile}>
            {user.avatarUrl ? (
              <Avatar resizeMode="cover" source={{ uri: user.avatarUrl }} />
            ) : (
              <Avatar
                resizeMode="cover"
                source={require("../../assets/blankProfile.png")}
              />
            )}
          </AvatarView>
          <ContentText>{`${user.username}${
            contentId === 1
              ? t("notification.1")
              : contentId === 2
              ? t("notification.2")
              : contentId === 3
              ? t("notification.3")
              : null
          }`}</ContentText>
        </BottomContainer>
      </Container>
      <Separator />
    </>
  );
}

export default React.memo(NotificationList);
