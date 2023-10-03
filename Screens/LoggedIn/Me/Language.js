import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenLayout from "../../../Components/ScreenLayout";
import { colors } from "../../../Colors";
import { gql, useMutation } from "@apollo/client";

const UPDATE_LANGUAGE_MUTATION = gql`
  mutation updateLanguage($language: String!) {
    updateLanguage(language: $language) {
      ok
      error
    }
  }
`;

const Button = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  width: 100%;
  margin-left: 10px;
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

export default function Language() {
  const { i18n } = useTranslation();

  const [lng, setLng] = useState();

  const [languageMutation] = useMutation(UPDATE_LANGUAGE_MUTATION);

  const handleLng = async (language) => {
    i18n.changeLanguage(language);
    setLng(language);
    await AsyncStorage.setItem("lng", language);
    await languageMutation({
      variables: {
        language,
      },
    });
  };

  useEffect(() => {
    setLng(i18n.language);
  }, []);
  return (
    <ScreenLayout>
      <Button onPress={() => handleLng("vn")}>
        <ButtonText>Tiếng Việt</ButtonText>
        {lng === "vn" ? (
          <Ionicons
            name="checkmark"
            color={colors.blue}
            size={25}
            style={{ marginRight: 30 }}
          />
        ) : null}
      </Button>
      <Separator />
      <Button onPress={() => handleLng("en")}>
        <ButtonText>English</ButtonText>
        {lng === "en" ? (
          <Ionicons
            name="checkmark"
            color={colors.blue}
            size={25}
            style={{ marginRight: 30 }}
          />
        ) : null}
      </Button>
      <Separator />
      <Button onPress={() => handleLng("ko")}>
        <ButtonText>한국어</ButtonText>
        {lng === "ko" ? (
          <Ionicons
            name="checkmark"
            color={colors.blue}
            size={25}
            style={{ marginRight: 30 }}
          />
        ) : null}
      </Button>
      <Separator />
    </ScreenLayout>
  );
}
