import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import AuthButton from "../../Components/Auth/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "../../Components/Auth/AuthShared";
import FormError from "../../Components/Auth/FormError";
import CreateAccountLayout from "../../Components/CreateAccountLayout";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";
import styled from "styled-components/native";
import { colors } from "../../Colors";

const REQUEST_SECRET_MUTATION = gql`
  mutation requestSecret($language: String!, $email: String!) {
    requestSecret(language: $language, email: $email) {
      ok
      error
    }
  }
`;

const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $secret: String!) {
    confirmSecret(email: $email, secret: $secret) {
      ok
      error
    }
  }
`;

const TimeText = styled.Text`
  color: ${colors.error};
  font-weight: 600;
  font-size: 12px;
  margin: 0px 0px 25px 0px;
`;

export default function ConfirmSecret({ route: { params } }) {
  const { t } = useTranslation();
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [waitingMail, setWaitingMail] = useState(true);
  const navigation = useNavigation();

  const { handleSubmit, formState, control, setError, clearErrors } = useForm({
    mode: "onChange",
  });

  const onCompleted = async (data) => {
    const {
      confirmSecret: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error === "100" ? t("confirmSecret.7") : t("confirmSecret.8"),
      });
    } else {
      navigation.navigate("AskUsername", {
        email: params.email,
        pushToken: params.pushToken,
        language: params.language,
      });
    }
  };

  const [requestSecretMutation, { loading }] = useMutation(
    REQUEST_SECRET_MUTATION
  );

  const [confirmSecretMutation, { loading: confirmLoading }] = useMutation(
    CONFIRM_SECRET,
    {
      onCompleted,
    }
  );

  const onValid = async ({ secret }) => {
    if (!loading) {
      await confirmSecretMutation({
        variables: {
          email: params.email,
          secret,
        },
      });
    }
  };

  const reSend = () => {
    if (waitingMail === true) {
      setTimeout(() => {
        setWaitingMail(true);
      }, 30000);
      if (!loading) {
        requestSecretMutation({
          variables: {
            language: params.language,
            email: params.email,
          },
        });
        Alert.alert(t("confirmSecret.9"));
        setMinutes(3);
        setSeconds(0);
        setWaitingMail(false);
      }
    } else {
      Alert.alert(t("confirmSecret.10"));
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const clearSecretError = () => {
    clearErrors("result");
  };

  return (
    <CreateAccountLayout step={"2"}>
      <ProgressCreateCompany title={t("confirmSecret.1")} />
      <FormError message={formState.errors?.result?.message} />
      <Controller
        name="secret"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={t("confirmSecret.2")}
            placeholderTextColor="#cccccc"
            keyboardType="number-pad"
            autoCapitalize="none"
            onChange={clearSecretError}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
          />
        )}
      />
      <TimeText>
        {minutes === 0 && seconds === 0
          ? t("confirmSecret.6")
          : seconds >= 10
          ? `${t("confirmSecret.5")} 0${minutes}:${seconds}`
          : `${t("confirmSecret.5")} 0${minutes}:0${seconds}`}
      </TimeText>
      <AuthButton
        text={t("confirmSecret.3")}
        disabled={!formState.isValid || (minutes === 0 && seconds === 0)}
        onPress={handleSubmit(onValid)}
        loading={confirmLoading}
      />
      <AuthButton
        text={t("confirmSecret.4")}
        onPress={reSend}
        loading={false}
        lastOne={true}
      />
    </CreateAccountLayout>
  );
}
