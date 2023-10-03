import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import AuthButton from "../../Components/Auth/AuthButton";
import FormError from "../../Components/Auth/FormError";
import { TextInput } from "../../Components/Auth/AuthShared";
import { passwordRule } from "../../RegExp";
import CreateAccountLayout from "../../Components/CreateAccountLayout";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";

export default function AskPassword({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onValid = (data) => {
    return navigation.navigate("AcceptTerms", {
      email: params.email,
      username: params.username,
      password: data.password,
      pushToken: params.pushToken,
      language: params.language,
    });
  };

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
  });

  const passwordRef = useRef();
  const password2Ref = useRef();
  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  return (
    <CreateAccountLayout step={4}>
      <ProgressCreateCompany title={t("askPassword.1")} />
      <FormError message={formState?.errors?.result?.message} />
      <FormError message={formState?.errors?.password?.message} />
      <Controller
        name="password"
        rules={{
          required: true,
          pattern: {
            value: passwordRule,
            message: t("askPassword.3"),
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder={t("askPassword.1")}
            placeholderTextColor="#cccccc"
            secureTextEntry
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={() => onNext(password2Ref)}
            hasError={Boolean(formState?.errors?.password?.message)}
          />
        )}
      />
      <FormError message={formState?.errors?.password2?.message} />
      <Controller
        name="password2"
        rules={{
          required: true,
          validate: {
            checkAgain: () => {
              const { password, password2 } = getValues();
              return password === password2 || t("askPassword.4");
            },
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={password2Ref}
            lastOne={true}
            placeholder={t("askPassword.2")}
            placeholderTextColor="#cccccc"
            secureTextEntry
            returnKeyType="done"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={handleSubmit(onValid)}
            hasError={Boolean(formState?.errors?.password2?.message)}
          />
        )}
      />
      <AuthButton
        text={t("share.4")}
        disabled={!formState.isValid}
        onPress={handleSubmit(onValid)}
      />
    </CreateAccountLayout>
  );
}
