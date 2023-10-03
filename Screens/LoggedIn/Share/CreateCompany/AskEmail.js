import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CreateCompanyLayout from "../../../../Components/CreateCompanyLayout";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { emailRule } from "../../../../RegExp";
import FormError from "../../../../Components/Auth/FormError";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

export default function AskEmail({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { control, handleSubmit, getValues, formState, setError, clearErrors } =
    useForm({
      mode: "onChange",
    });

  const goToContactNumber = () => {
    const { email } = getValues();
    return navigation.navigate("AskContactNumber", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      totalEmployees: params.totalEmployees,
      email,
    });
  };

  const clearEmailError = () => {
    clearErrors("result");
  };

  return (
    <CreateCompanyLayout step={"4"}>
      <ProgressCreateCompany title={t("askEmail.1")} />
      <Controller
        name="email"
        rules={{
          required: true,
          pattern: {
            value: emailRule,
            message: "이메일 주소가 올바르지 않습니다.",
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder="vinaarba@gmail.com"
            placeholderTextColor="#cccccc"
            autoCapitalize="none"
            returnKeyType="done"
            keyboardType="email-address"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearEmailError}
            hasError={false}
            onSubmitEditing={goToContactNumber}
            maxLength={50}
          />
        )}
      />
      <UnderBar
        lastOne={!formState?.errors?.result?.message}
        hasError={formState?.errors?.result?.message}
      />
      <FormError message={formState?.errors?.result?.message} />
      <AuthButton
        text={t("askEmail.2")}
        disabled={!formState.isValid}
        onPress={goToContactNumber}
      />
    </CreateCompanyLayout>
  );
}
