import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AuthButton from "../../Components/Auth/AuthButton";
import FormError from "../../Components/Auth/FormError";
import { TextInput } from "../../Components/Auth/AuthShared";
import { usernameRule } from "../../RegExp";
import CreateAccountLayout from "../../Components/CreateAccountLayout";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";

const CHECK_USERNAME__MUTATION = gql`
  mutation checkUsername($username: String!) {
    checkUsername(username: $username) {
      ok
      error
    }
  }
`;

export default function AskUsername({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onCompleted = (data) => {
    const {
      checkUsername: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error === "100" ? t("askUsername.3") : t("share.5"),
      });
    } else {
      const { username } = getValues();
      return navigation.navigate("AskPassword", {
        username,
        email: params.email,
        pushToken: params.pushToken,
        language: params.language,
      });
    }
  };

  const [checkUsernameMutation, { loading }] = useMutation(
    CHECK_USERNAME__MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = ({ username }) => {
    if (!loading) {
      checkUsernameMutation({
        variables: {
          username,
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
    <CreateAccountLayout step={3}>
      <ProgressCreateCompany title={t("askUsername.1")} />
      <FormError message={formState?.errors?.username?.message} />
      <FormError message={formState?.errors?.result?.message} />
      <Controller
        name="username"
        rules={{
          required: true,
          pattern: {
            value: usernameRule,
            message: t("askUsername.2"),
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            lastOne={true}
            placeholder={t("askUsername.1")}
            placeholderTextColor="#cccccc"
            autoCapitalize="none"
            returnKeyType="next"
            onChangeText={(text) => onChange(text)}
            value={value}
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
