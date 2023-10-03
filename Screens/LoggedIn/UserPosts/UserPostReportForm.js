import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../Components/ScreenLayout";
import { userPostReportAry } from "../../../Constant";
import { colors } from "../../../Colors";

const REPORT_MUTATION = gql`
  mutation userPostReport($userPostId: Int!, $reason: String!) {
    userPostReport(userPostId: $userPostId, reason: $reason) {
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

export default function UserPostReportForm({ route: { params } }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const goReportUserPost = () => {
    Alert.alert(t("userPostReportForm.3"));
    navigation.pop();
  };
  const [reportPostMutation, { loading }] = useMutation(REPORT_MUTATION, {
    onCompleted: goReportUserPost,
    onError: (error) => {
      if (error.message === "100") {
        Alert.alert(t("alert.1"));
      } else {
        Alert.alert(t("alert.4"));
      }
      navigation.pop();
    },
  });

  const goToReport = (item) => {
    reportPostMutation({
      variables: {
        userPostId: parseInt(params.id),
        reason: item,
      },
    });
  };
  const handleReport = (item) => {
    Alert.alert(t("userPostReportForm.2"), "", [
      { text: t("userPostReportForm.5") },
      {
        text: t("userPostReportForm.4"),
        onPress: () => goToReport(item),
      },
    ]);
  };

  return (
    <ScreenLayout>
      <Container>
        <TitleView>
          <TitleText>{t("userPostReportForm.1")}</TitleText>
        </TitleView>
        {userPostReportAry.map((item, index) => (
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
