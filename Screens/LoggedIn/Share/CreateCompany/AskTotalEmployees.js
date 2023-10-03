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
import { onlyNumber } from "../../../../RegExp";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

export default function AskTotalEmployees({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const goToAskEmail = () => {
    const { totalEmployees } = getValues();
    navigation.navigate("AskEmail", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      totalEmployees,
    });
  };

  return (
    <CreateCompanyLayout step={"3"}>
      <ProgressCreateCompany title={t("askTotalEmployees.1")} />
      <Controller
        name="totalEmployees"
        rules={{
          required: true,
          pattern: {
            value: onlyNumber,
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder={"100"}
            placeholderTextColor="#cccccc"
            autoCapitalize="none"
            returnKeyType="done"
            keyboardType="number-pad"
            onChangeText={(text) => onChange(text)}
            value={value}
            hasError={false}
            onSubmitEditing={goToAskEmail}
            maxLength={7}
          />
        )}
      />
      <UnderBar lastOne={true} />
      <AuthButton
        text={t("askTotalEmployees.2")}
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAskEmail}
      />
    </CreateCompanyLayout>
  );
}
