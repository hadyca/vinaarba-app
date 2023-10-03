import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-native-phone-number-input";
import AuthButton from "../../Components/Auth/AuthButton";
import FormError from "../../Components/Auth/FormError";
import { colors } from "../../Colors";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";
import CreateAccountLayout from "../../Components/CreateAccountLayout";

const CHECK_ACCOUNT_MUTATION = gql`
  mutation checkAccount(
    $language: String!
    $countryCode: String!
    $phoneNumber: String!
    $accountNumber: String!
  ) {
    checkAccount(
      language: $language
      countryCode: $countryCode
      phoneNumber: $phoneNumber
      accountNumber: $accountNumber
    ) {
      ok
      error
    }
  }
`;

export default function AskPhoneNumber({ route: { params } }) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(true);

  const phoneInput = useRef();
  const navigation = useNavigation();

  const { setError, clearErrors, formState } = useForm({
    mode: "onChange",
  });

  const clearLoginError = () => {
    clearErrors("result");
  };

  const onCompleted = (data) => {
    const {
      checkAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error === "100" ? t("askPhoneNumber.4") : t("share.5"),
      });
    } else {
      return navigation.navigate("ConfirmSecret", {
        countryCode: phoneInput.current?.getCallingCode(),
        phoneNumber: value,
        accountNumber: formattedValue.substring(1),
        pushToken: params.pushToken,
        language: params.language,
      });
    }
  };

  const [checkAccountMutation, { loading }] = useMutation(
    CHECK_ACCOUNT_MUTATION,
    {
      variables: {
        language: params.language,
        countryCode: phoneInput.current?.getCallingCode(),
        phoneNumber: value,
        accountNumber: formattedValue.substring(1),
      },
      onCompleted,
    }
  );

  return (
    <CreateAccountLayout step={"1"}>
      <ProgressCreateCompany title={t("askPhoneNumber.1")} />
      {!valid ? <FormError message={t("askPhoneNumber.2")} /> : null}
      <FormError message={formState?.errors?.result?.message} />
      <PhoneInput
        containerStyle={{
          width: "100%",
          backgroundColor: "white",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: colors.borderThick,
          borderRadius: 4,
          paddingRight: 5,
          marginBottom: 25,
        }}
        textContainerStyle={{
          backgroundColor: "white",
        }}
        filterProps={{
          placeholder: t("askPhoneNumber.3"),
          placeholderTextColor: "#cccccc",
        }}
        textInputProps={{ placeholderTextColor: "#cccccc" }}
        ref={phoneInput}
        defaultValue={value}
        placeholder={t("askPhoneNumber.1")}
        defaultCode="VN"
        layout="first"
        onChangeText={(text) => {
          setValue(text);
          setValid(true);
          clearLoginError();
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
          setValid(true);
          clearLoginError();
        }}
      />
      <AuthButton
        text={t("share.4")}
        loading={loading}
        onPress={() => {
          const checkValid = phoneInput.current?.isValidNumber(value);
          setValid(checkValid ? checkValid : false);
          if (checkValid) {
            checkAccountMutation();
          }
        }}
      />
    </CreateAccountLayout>
  );
}
