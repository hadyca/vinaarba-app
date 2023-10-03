import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../Components/ScreenLayout";
import { colors } from "../../../Colors";
import { logUserOut } from "../../../apollo";

const Container = styled.View`
  margin-left: 10px;
`;
const AccountView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const AccountText = styled.Text`
  background-color: ${colors.backgraound};
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;
const Button = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;

const Separator = styled.View`
  height: 1px;
  background-color: ${colors.borderThin};
`;

const DELETE_PUSHTOKEN_MUTATION = gql`
  mutation deletePushToken($pushToken: String!) {
    deletePushToken(pushToken: $pushToken) {
      ok
      error
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: Int!) {
    deleteUser(userId: $userId) {
      ok
      error
    }
  }
`;

export default function Account({ route: { params } }) {
  const { t } = useTranslation();
  const [deletePushTokenMutation, { loading }] = useMutation(
    DELETE_PUSHTOKEN_MUTATION,
    {
      onCompleted: () => logUserOut(),
    }
  );

  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => logUserOut(),
  });
  return (
    <ScreenLayout loading={loading}>
      <Container>
        <AccountView>
          <AccountText>{t("account.1")} </AccountText>
          <AccountText style={{ marginRight: 25 }}>{params.email}</AccountText>
        </AccountView>
        <Separator />
        <Button
          onPress={() =>
            Alert.alert(t("account.3"), "", [
              { text: t("share.2") },
              {
                text: t("share.1"),
                onPress: async () => {
                  const pushToken = (
                    await Notifications.getExpoPushTokenAsync()
                  ).data;
                  await deletePushTokenMutation({
                    variables: {
                      pushToken,
                    },
                  });
                },
              },
            ])
          }
        >
          <ButtonText>{t("account.2")}</ButtonText>
          <Ionicons
            name="chevron-forward"
            color="black"
            size={17}
            style={{ marginRight: 20 }}
          />
        </Button>
        <Separator />
        <Button
          onPress={() =>
            Alert.alert(t("account.5"), "", [
              { text: t("share.2") },
              {
                text: t("share.1"),
                onPress: async () => {
                  await deleteUserMutation({
                    variables: {
                      userId: params.userId,
                    },
                  });
                },
              },
            ])
          }
        >
          <ButtonText>{t("account.4")}</ButtonText>
          <Ionicons
            name="chevron-forward"
            color="black"
            size={17}
            style={{ marginRight: 20 }}
          />
        </Button>
        <Separator />
      </Container>
    </ScreenLayout>
  );
}
