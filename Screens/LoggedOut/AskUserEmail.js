import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AuthButton from "../../Components/Auth/AuthButton";
import FormError from "../../Components/Auth/FormError";
import { TextInput } from "../../Components/Auth/AuthShared";
import { emailRule } from "../../RegExp";
import CreateAccountLayout from "../../Components/CreateAccountLayout";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";

const CHECK_EMAIL_MUTATION = gql`
  mutation checkEmail($email: String!, $language: String!) {
    checkEmail(email: $email, language: $language) {
      ok
      error
    }
  }
`;

export default function AskUserEmail({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onCompleted = (data) => {
    const { email } = getValues();
    const {
      checkEmail: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error === "100" ? t("askUserEmail.2") : t("share.5"),
      });
    } else {
      return navigation.navigate("ConfirmSecret", {
        pushToken: params.pushToken,
        language: params.language,
        email,
      });
    }
  };

  const [checkEmail, { loading }] = useMutation(CHECK_EMAIL_MUTATION, {
    onCompleted,
  });

  const onValid = ({ email }) => {
    if (!loading) {
      checkEmail({
        variables: {
          email,
          language: params.language,
        },
      });
    }
  };

  const { control, handleSubmit, getValues, formState, setError, clearErrors } =
    useForm({
      mode: "onChange",
    });
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <CreateAccountLayout step={1}>
      <ProgressCreateCompany title={t("askUserEmail.1")} />
      <FormError message={formState?.errors?.result?.message} />
      <Controller
        name="email"
        rules={{
          required: true,
          pattern: {
            value: emailRule,
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            lastOne={true}
            placeholder="vinaarba@gmail.com"
            placeholderTextColor="#cccccc"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearLoginError}
          />
        )}
      />
      <AuthButton
        text={t("share.4")}
        disabled={!formState.isValid}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </CreateAccountLayout>
  );
}
