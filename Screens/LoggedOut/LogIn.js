import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { logUserIn } from "../../apollo";
import AuthButton from "../../Components/Auth/AuthButton";
import { TextInput } from "../../Components/Auth/AuthShared";
import FormError from "../../Components/Auth/FormError";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";
import CreateAccountLayout from "../../Components/CreateAccountLayout";

const LOGIN_MUTATION = gql`
  mutation login(
    $email: String!
    $password: String!
    $pushToken: String!
    $language: String!
  ) {
    login(
      email: $email
      password: $password
      pushToken: $pushToken
      language: $language
    ) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  const { t } = useTranslation();

  const { handleSubmit, watch, control, setError, clearErrors, formState } =
    useForm({
      mode: "onChange",
    });

  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onCompleted = async (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error === "200" ? t("logIn.3") : t("share.5"),
      });
    } else {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onValid = async ({ email, password }) => {
    if (!loading) {
      await logInMutation({
        variables: {
          email,
          password,
          pushToken: params.pushToken,
          language: params.language,
        },
      });
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <CreateAccountLayout>
      <ProgressCreateCompany title={""} />
      <FormError message={formState?.errors?.email?.message} />
      <FormError message={formState?.errors?.result?.message} />
      <Controller
        name="email"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="vinaarba@gmail.com"
            placeholderTextColor="#cccccc"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearLoginError}
          />
        )}
      />
      <Controller
        name="password"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            lastOne={true}
            value={value || ""}
            ref={passwordRef}
            placeholder={t("logIn.2")}
            placeholderTextColor="#cccccc"
            secureTextEntry
            returnKeyType="done"
            hasError={Boolean(formState?.errors?.password?.message)}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => onChange(text)}
            onChange={clearLoginError}
          />
        )}
      />
      <AuthButton
        text={t("logIn.4")}
        loading={loading}
        disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </CreateAccountLayout>
  );
}
