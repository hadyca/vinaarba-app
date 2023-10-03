import React from "react";
import { Alert } from "react-native";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../Components/ScreenLayout";
import { userPostCommentReportAry } from "../../../Constant";
import { colors } from "../../../Colors";

const REPORT_MUTATION = gql`
  mutation companyPostReCommentReport(
    $companyPostReCommentId: Int!
    $reason: String!
  ) {
    companyPostReCommentReport(
      companyPostReCommentId: $companyPostReCommentId
      reason: $reason
    ) {
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

const ReportView = styled.TouchableOpacity`
  padding: 18px 15px;
  color: black;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const ReportText = styled.Text``;

export default function CompanyPostReCommentReportForm({ route: { params } }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const goReportCompanyPostComment = () => {
    Alert.alert(t("userPostCommentReportForm.3"));
    navigation.pop();
  };
  const [reportReCommentMutation, { loading }] = useMutation(REPORT_MUTATION, {
    onCompleted: goReportCompanyPostComment,
    onError: (error) => {
      if (error.message === "100") {
        Alert.alert(t("alert.3"));
      } else {
        Alert.alert(t("alert.4"));
      }
      navigation.pop();
    },
  });

  const goToReport = (item) => {
    reportReCommentMutation({
      variables: {
        companyPostReCommentId: parseInt(params.id),
        reason: item,
      },
    });
  };
  const handleReport = (item) => {
    Alert.alert(t("userPostCommentReportForm.2"), "", [
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
          <TitleText>{t("userPostCommentReportForm.1")}</TitleText>
        </TitleView>
        {userPostCommentReportAry.map((item, index) => (
          <ReportView key={index} onPress={() => handleReport(item.valueEn)}>
            <ReportText>
              {i18n.language === "vn"
                ? item.valueVn
                : i18n.language === "en"
                ? item.valueEn
                : item.valueKo}
            </ReportText>
          </ReportView>
        ))}
      </Container>
    </ScreenLayout>
  );
}
