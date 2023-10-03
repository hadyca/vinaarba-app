import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { TOGGLE_BLOCKING_MUTATION } from "./BlockingListQueries";
import BlockingListPresenter from "./BlockingListPresenter";
import { Alert } from "react-native";

export default function ({ id, username, avatarUrl, isBlocking }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const updateToggleBlocking = (cache, result) => {
    const {
      data: { toggleBlocking },
    } = result;
    if (toggleBlocking.id) {
      const UserId = `User:${id}`;
      cache.modify({
        id: UserId,
        fields: {
          isBlocking(prev) {
            return !prev;
          },
        },
      });
    }
  };

  const [toggleBlockingMutation, { loading }] = useMutation(
    TOGGLE_BLOCKING_MUTATION,
    {
      variables: {
        userId: parseInt(id),
      },
      update: updateToggleBlocking,
      onError: (error) => {
        if (error.message === "100") {
          Alert.alert(t("alert.2"));
        } else {
          Alert.alert(t("alert.4"));
        }
        navigation.pop();
      },
    }
  );

  const goToProfile = () => {
    navigation.push("Profile", {
      id,
    });
  };

  return (
    <BlockingListPresenter
      username={username}
      avatarUrl={avatarUrl}
      goToProfile={goToProfile}
      isBlocking={isBlocking}
      toggleBlockingMutation={toggleBlockingMutation}
    />
  );
}
