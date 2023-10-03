import React, { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Colors";
import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import { UnderBar } from "../../../../Components/Auth/AuthShared";
import { usernameRule } from "../../../../RegExp";
import FormError from "../../../../Components/Auth/FormError";

const HeaderRightText = styled.Text`
  color: ${(props) => (props.ok ? colors.buttonBackground : colors.black)};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const Container = styled.View`
  margin: 10px;
`;
const TextInput = styled.TextInput`
  padding: 15px 7px 0px 3px;
  color: black;
`;

const CountingText = styled.Text`
  color: ${colors.error};
  font-size: 11px;
`;

export default function EditUsernamePresenter({
  editUsernameMutation,
  countingText,
  counting,
  loading,
  originUsername,
  today,
  errorMessage,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: originUsername,
    },
    mode: "onChange",
  });

  const onValid = async ({ username }) => {
    if (originUsername === username) {
      navigation.pop();
    } else {
      if (!loading) {
        Alert.alert(t("editUsername.1"), "", [
          { text: t("share.2") },
          {
            text: t("share.1"),
            onPress: () =>
              editUsernameMutation({
                variables: {
                  username,
                  usernameEditDate: String(today),
                },
              }),
          },
        ]);
      }
    }
  };

  const NoHeaderRight = () => (
    <TouchableOpacity disabled={true} style={{ marginRight: 10, opacity: 0.5 }}>
      <HeaderRightText>{t("editUsername.4")}</HeaderRightText>
    </TouchableOpacity>
  );

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText ok={true}>{t("editUsername.4")}</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading
        ? HeaderRightLoading
        : !formState.isValid
        ? NoHeaderRight
        : OkHeaderRight,
    });
  }, [loading, formState.isValid]);

  return (
    <DismissKeyboard>
      <Container>
        <Controller
          name="username"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: usernameRule,
              message: t("editUsername.5"),
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder={t("editUsername.3")}
              placeholderTextColor="#cccccc"
              textAlignVertical={"top"}
              maxLength={20}
              autoCapitalize="none"
              onChangeText={(text) => {
                onChange(text);
                countingText(text);
              }}
              value={value.trim()}
            />
          )}
        />
        <UnderBar />
        <FormError message={formState?.errors?.username?.message} />
        {errorMessage === "100" ? (
          <FormError message={t("editUsername.2")} />
        ) : errorMessage === "200" ? (
          <FormError message={t("editUsername.6")} />
        ) : null}
        <CountingText>({counting}/20)</CountingText>
      </Container>
    </DismissKeyboard>
  );
}
