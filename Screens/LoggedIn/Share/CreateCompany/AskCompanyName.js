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
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

export default function AskCompanyName() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const goToAboutUs = () => {
    const { companyName } = getValues();
    navigation.navigate("AskAboutUs", {
      companyName,
    });
  };

  return (
    <CreateCompanyLayout step={"1"}>
      <ProgressCreateCompany title={t("askCompanyName.1")} />
      <Controller
        name="companyName"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder="VinaArba"
            placeholderTextColor="#cccccc"
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={false}
            onSubmitEditing={goToAboutUs}
            maxLength={100}
          />
        )}
      />
      <UnderBar lastOne={true} />
      <AuthButton
        text={t("askCompanyName.2")}
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAboutUs}
      />
    </CreateCompanyLayout>
  );
}
