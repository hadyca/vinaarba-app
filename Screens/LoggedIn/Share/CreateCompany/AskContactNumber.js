import React, { useState } from "react";
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

export default function AskContactNumber({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const goToAskAddress = () => {
    const { contactNumber } = getValues();
    navigation.navigate("AskAddress_1", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      totalEmployees: params.totalEmployees,
      email: params.email,
      contactNumber,
    });
  };

  return (
    <CreateCompanyLayout step={"5"}>
      <ProgressCreateCompany title={t("askContactNumber.1")} />

      <Controller
        name="contactNumber"
        rules={{
          required: true,
          pattern: {
            value: onlyNumber,
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder="0341112222"
            placeholderTextColor="#cccccc"
            returnKeyType="done"
            keyboardType="number-pad"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={false}
            onSubmitEditing={goToAskAddress}
            maxLength={20}
          />
        )}
      />
      <UnderBar lastOne={true} />

      <AuthButton
        text={t("askContactNumber.2")}
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAskAddress}
      />
    </CreateCompanyLayout>
  );
}
