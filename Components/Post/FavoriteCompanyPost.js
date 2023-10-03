import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Colors";
import { timeForToday } from "../../Utils";
import UserAvatar from "../UserAvatar";
import BaseInfo from "./BaseInfo";

const Container = styled.View``;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Header = styled.TouchableOpacity`
  margin: 10px;
`;

const CompanyName = styled.Text`
  margin-top: 5px;
`;

const Contents = styled.TouchableOpacity`
  margin-left: 10px;
`;

const Content = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: flex-end;
`;

const ContentText = styled.Text`
  color: ${colors.black};
`;

const LikeComment = styled.View`
  margin-left: 10px;
  flex-direction: row;
  margin-top: 5px;
`;

const Likes = styled.Text`
  margin-right: 5px;
  color: ${colors.greyText};
  font-size: 11px;
`;

const Comments = styled.Text`
  color: ${colors.greyText};
  font-size: 11px;
`;

const Date = styled.Text`
  margin-top: 3px;
  margin-left: 10px;
  color: ${colors.greyText};
  font-size: 8px;
`;

const Separator = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${colors.borderThin};
  margin-top: 20px;
`;

function FavoriteCompanyPost({
  id,
  company,
  title,
  wage,
  wageTypeId,
  workingDay,
  dayOption,
  startTime,
  finishTime,
  timeOption,
  contactNumber,
  email,
  totalCompanyPostLikes,
  totalCompanyPostComments,
  createdAt,
}) {
  const time = timeForToday(parseInt(createdAt));

  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      id: company.user.id,
    });
  };

  const goToPostDetail = () => {
    navigation.navigate("CompanyPostListDetail", {
      id,
    });
  };

  return (
    <Container>
      <HeaderContainer>
        <Header onPress={goToProfile}>
          <UserAvatar
            username={company.user.username}
            uri={company.user.avatarUrl}
          />
          <CompanyName>
            {company.companyName} · {company.addressStep1} ·{" "}
            {company.addressStep2}
          </CompanyName>
        </Header>
      </HeaderContainer>
      <Contents onPress={goToPostDetail}>
        <Content>
          <ContentText>{title}</ContentText>
        </Content>
        <BaseInfo
          wageTypeId={wageTypeId}
          wage={wage}
          workingDay={workingDay}
          dayOption={dayOption}
          startTime={startTime}
          finishTime={finishTime}
          timeOption={timeOption}
          contactNumber={contactNumber}
          email={email}
        />
      </Contents>
      <LikeComment>
        <Likes>
          {totalCompanyPostLikes > 1
            ? `${totalCompanyPostLikes} likes`
            : `${totalCompanyPostLikes} like`}
        </Likes>
        <Comments>
          {totalCompanyPostComments > 1
            ? `${totalCompanyPostComments} comments`
            : `${totalCompanyPostComments} comment`}
        </Comments>
      </LikeComment>
      <Date>{time}</Date>
      <Separator />
    </Container>
  );
}

export default React.memo(FavoriteCompanyPost);
