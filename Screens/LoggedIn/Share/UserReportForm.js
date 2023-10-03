import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../Components/ScreenLayout";
import { userReportAry } from "../../../Constant";
import { colors } from "../../../Colors";

const REPORT_MUTATION = gql`
  mutation userReport($userId: Int!, $reason: String!) {
    userReport(userId: $userId, reason: $reason) {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const TitleView = styled.View`
  padding: 25px 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const TitleText = styled.Text`
  font-weight: bold;
`;

const ReportContainer = styled.View``;
const ReportView = styled.TouchableOpacity`
  padding: 18px 15px;
  color: black;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
`;

const ReportText = styled.Text``;

export default function UserReportForm({ route: { params } }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const goReportUser = () => {
    Alert.alert(t("userPostReportForm.3"));
    navigation.pop();
  };
  const [reportUserMutation, { loading }] = useMutation(REPORT_MUTATION, {
    onCompleted: goReportUser,

    onError: (error) => {
      if (error.message === "100") {
        Alert.alert(t("alert.2"));
      } else {
        Alert.alert(t("alert.4"));
      }
      navigation.pop();
    },
  });

  const goToReport = (item) => {
    reportUserMutation({
      variables: {
        userId: parseInt(params.id),
        reason: item,
      },
    });
  };
  const handleReport = (item) => {
    Alert.alert(t("userPostReportForm.2"), "", [
      { text: t("share.2") },
      {
        text: t("share.1"),
        onPress: () => goToReport(item),
      },
    ]);
  };

  return (
    <ScreenLayout>
      <Container>
        <TitleView>
          <TitleText>{t("userReportForm.1")}</TitleText>
        </TitleView>
        {userReportAry.map((item, index) => (
          <ReportContainer key={index}>
            <ReportView onPress={() => handleReport(item.valueEn)}>
              <ReportText>
                {i18n.language === "vn"
                  ? item.valueVn
                  : i18n.language === "en"
                  ? item.valueEn
                  : item.valueKo}
              </ReportText>
            </ReportView>
            <Separator />
          </ReportContainer>
        ))}
      </Container>
    </ScreenLayout>
  );
}
