import React from "react";
import { Switch } from "react-native";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Colors";
const Container = styled.View``;

const StateView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
`;
const StateText = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;
const Separator = styled.View`
  height: 1px;
  background-color: ${colors.borderThin};
`;

export default function NotificationSettingPresenter({
  noticeToggle,
  userPostLikeToggle,
  userPostCommentToggle,
  companyPostLikeToggle,
  companyPostCommentToggle,
  followingToggle,
  noticeState,
  userPostLikeState,
  userPostCommentState,
  companyPostLikeState,
  companyPostCommentState,
  followingState,
  isCompany,
}) {
  const { t } = useTranslation();

  return (
    <Container>
      <StateView>
        <StateText>{t("notificationSetting.1")}</StateText>
        <Switch
          trackColor={{
            false: colors.greyBackround,
            true: colors.buttonBackground,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={colors.greyBackround}
          onValueChange={noticeToggle}
          value={noticeState}
          style={{ marginRight: 10 }}
        />
      </StateView>
      <Separator />
      <StateView>
        <StateText>{t("notificationSetting.2")}</StateText>
        <Switch
          trackColor={{
            false: colors.greyBackround,
            true: colors.buttonBackground,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={colors.greyBackround}
          onValueChange={userPostLikeToggle}
          value={userPostLikeState}
          style={{ marginRight: 10 }}
        />
      </StateView>
      <Separator />
      <StateView>
        <StateText>{t("notificationSetting.3")}</StateText>
        <Switch
          trackColor={{
            false: colors.greyBackround,
            true: colors.buttonBackground,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={colors.greyBackround}
          onValueChange={userPostCommentToggle}
          value={userPostCommentState}
          style={{ marginRight: 10 }}
        />
      </StateView>
      <Separator />
      {isCompany && (
        <>
          <StateView>
            <StateText>{t("notificationSetting.4")}</StateText>
            <Switch
              trackColor={{
                false: colors.greyBackround,
                true: colors.buttonBackground,
              }}
              thumbColor={"#ffffff"}
              ios_backgroundColor={colors.greyBackround}
              onValueChange={companyPostLikeToggle}
              value={companyPostLikeState}
              style={{ marginRight: 10 }}
            />
          </StateView>
          <Separator />
          <StateView>
            <StateText>{t("notificationSetting.5")}</StateText>
            <Switch
              trackColor={{
                false: colors.greyBackround,
                true: colors.buttonBackground,
              }}
              thumbColor={"#ffffff"}
              ios_backgroundColor={colors.greyBackround}
              onValueChange={companyPostCommentToggle}
              value={companyPostCommentState}
              style={{ marginRight: 10 }}
            />
          </StateView>
          <Separator />
        </>
      )}
      <StateView>
        <StateText>{t("notificationSetting.6")}</StateText>
        <Switch
          trackColor={{
            false: colors.greyBackround,
            true: colors.buttonBackground,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={colors.greyBackround}
          onValueChange={followingToggle}
          value={followingState}
          style={{ marginRight: 10 }}
        />
      </StateView>
      <Separator />
    </Container>
  );
}
