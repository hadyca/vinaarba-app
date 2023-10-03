import React from "react";
import { Button } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import * as WebBrowser from "expo-web-browser";
import AuthButton from "../../Components/Auth/AuthButton";
import { logUserIn } from "../../apollo";
import CreateAccountLayout from "../../Components/CreateAccountLayout";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation finalStepAccount(
    $password: String!
    $email: String!
    $username: String!
    $language: String!
    $pushToken: String!
  ) {
    finalStepAccount(
      password: $password
      email: $email
      username: $username
      language: $language
      pushToken: $pushToken
    ) {
      ok
      error
      token
    }
  }
`;

const Contents = styled.View`
  margin-bottom: 25px;
`;

const Content = styled.Text``;

const ButtonText = styled.Text`
  font-weight: bold;
  text-decoration: underline;
`;

export default function AcceptTerms({ route: { params } }) {
  const { t, i18n } = useTranslation();

  const onCompleted = async (data) => {
    const {
      finalStepAccount: { ok, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: t("share.5"),
      });
    } else {
      await logUserIn(token);
    }
  };

  const [finalStepAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const handleSubmit = () => {
    if (!loading) {
      finalStepAccountMutation({
        variables: {
          password: params.password,
          email: params.email,
          username: params.username,
          language: params.language,
          pushToken: params.pushToken,
        },
      });
    }
  };

  return (
    <CreateAccountLayout step={5}>
      <ProgressCreateCompany title={t("acceptTerms.1")} />
      {i18n.language === "vn" ? (
        <Contents>
          <Content>
            {`Tôi đồng ý với `}
            <ButtonText
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://vinaarba.notion.site/4b8d0b7e8b8043e3aeea3d93609ab847"
                )
              }
            >
              điều khoản sử dụng
            </ButtonText>
            {` và `}
            <ButtonText
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://vinaarba.notion.site/a2a0189d63f4445c9f2b3ee632a0a1e2"
                )
              }
            >
              chính sách quyền riêng tư
            </ButtonText>
            {` của VinaArba.`}
          </Content>
        </Contents>
      ) : i18n.language === "en" ? (
        <Contents>
          <Content>
            {`I agree to VinaArba's `}
            <ButtonText
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://vinaarba.notion.site/4b8d0b7e8b8043e3aeea3d93609ab847"
                )
              }
            >
              terms of service
            </ButtonText>
            {` and `}
            <ButtonText
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://vinaarba.notion.site/a2a0189d63f4445c9f2b3ee632a0a1e2"
                )
              }
            >
              privacy policy.
            </ButtonText>
          </Content>
        </Contents>
      ) : (
        <Contents>
          <Content>
            {`VinaArba의 `}
            <ButtonText
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://vinaarba.notion.site/4b8d0b7e8b8043e3aeea3d93609ab847"
                )
              }
            >
              이용약관
            </ButtonText>
            {` 및 `}
            <ButtonText
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://vinaarba.notion.site/a2a0189d63f4445c9f2b3ee632a0a1e2"
                )
              }
            >
              개인정보처리방침
            </ButtonText>
            {`에 동의 합니다.`}
          </Content>
        </Contents>
      )}
      <AuthButton
        text={t("share.3")}
        disabled={false}
        loading={loading}
        onPress={handleSubmit}
      />
    </CreateAccountLayout>
  );
}
