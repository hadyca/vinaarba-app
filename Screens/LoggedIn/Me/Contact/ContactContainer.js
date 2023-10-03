import React from "react";
import { useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { CONTACT_MUTATION } from "./ContactQueries";
import ContactPresenter from "./ContactPresenter";

export default function () {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const goToBack = () => {
    Alert.alert(t("contact.11"));
    navigation.pop();
  };

  const [contactMutation, { loading }] = useMutation(CONTACT_MUTATION, {
    onCompleted: goToBack,
  });

  return (
    <ContactPresenter contactMutation={contactMutation} loading={loading} />
  );
}
