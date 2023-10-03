import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import ModalSelector from "react-native-modal-selector";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Colors";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { emailRule } from "../../../../RegExp";
import { questionType } from "../../../../Constant";

const Container = styled.View`
  margin: 10px;
`;

const TopContainer = styled.View``;
const Title = styled.Text`
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const TextView = styled.View`
  border: 1px solid ${colors.borderThick};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
`;

const TypeInput = styled.TextInput`
  padding: 10px;
  color: black;
`;

const ContentInput = styled.TextInput`
  background-color: white;
  height: 300px;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid ${colors.borderThick};
`;
const SubmitContainer = styled.View`
  width: 100%;
  margin-top: 30px;
`;

const TitleInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid ${colors.borderThick};
`;

export default function ContactPresenter({ contactMutation, loading }) {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState({});
  const { control, handleSubmit } = useForm();
  const onValid = async ({ content, email }) => {
    if (!type.value) {
      Alert.alert(t("contact.6"));
    } else if (!content) {
      Alert.alert(t("contact.7"));
    } else if (!email) {
      Alert.alert(t("contact.8"));
    } else if (!emailRule.test(email)) {
      Alert.alert(t("contact.9"));
    } else {
      if (!loading) {
        contactMutation({
          variables: {
            type: type.value,
            content,
            email,
          },
        });
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      extraHeight={150}
      style={{
        backgroundColor: colors.backgraound,
      }}
    >
      <Container>
        <TopContainer>
          <Title>{t("contact.1")}</Title>
          <ModalSelector
            data={questionType}
            keyExtractor={(item) => item.id}
            labelExtractor={(item) =>
              i18n.language === "vn"
                ? item.valueVn
                : i18n.language === "en"
                ? item.valueEn
                : item.valueKo
            }
            accessible={true}
            onChange={(item) => {
              setType({
                id: item.id,
                value:
                  i18n.language === "vn"
                    ? item.valueVn
                    : i18n.language === "en"
                    ? item.valueEn
                    : item.valueKo,
              });
            }}
          >
            <TextView>
              <TypeInput
                placeholder={t("contact.2")}
                placeholderTextColor="#cccccc"
                value={type.value}
              />
              <Ionicons
                name="chevron-forward"
                color="black"
                size={17}
                style={{ marginRight: 10 }}
              />
            </TextView>
          </ModalSelector>
          <Title>{t("contact.4")}</Title>
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ContentInput
                multiline={true}
                numberOfLines={4}
                textAlignVertical={"top"}
                maxLength={1000}
                autoCapitalize="none"
                onChangeText={(text) => onChange(text)}
                value={value || ""}
              />
            )}
          />
          <Title>{t("contact.10")}</Title>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TitleInput
                placeholder={t("contact.3")}
                placeholderTextColor="#cccccc"
                autoCapitalize="none"
                maxLength={100}
                multiline={false}
                returnKeyType="next"
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
          />
        </TopContainer>
        <SubmitContainer>
          <AuthButton
            text={t("contact.5")}
            onPress={handleSubmit(onValid)}
            loading={loading}
          />
        </SubmitContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
}
