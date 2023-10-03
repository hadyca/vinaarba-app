import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import CreateCompanyLayout from "../../../../Components/CreateCompanyLayout";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";
import { colors } from "../../../../Colors";

const AboutUsView = styled.View`
  margin-bottom: 25px;
`;

const CountingText = styled.Text`
  color: ${colors.error};
  align-self: flex-end;
  font-size: 11px;
`;

export default function AskAboutUs({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [counting, setCounting] = useState(0);
  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });
  const countingText = (value) => {
    return setCounting(value.length);
  };

  const goToAskTotalEmployees = () => {
    const { aboutUs } = getValues();
    navigation.navigate("AskTotalEmployees", {
      companyName: params.companyName,
      aboutUs,
    });
  };

  return (
    <CreateCompanyLayout step={"2"}>
      <ProgressCreateCompany title={t("askAboutUs.1")} />
      <Controller
        name="aboutUs"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <AboutUsView>
            <TextInput_Company
              placeholder={t("askAboutUs.2")}
              placeholderTextColor="#cccccc"
              autoCapitalize="none"
              returnKeyType="done"
              onChangeText={(text) => {
                onChange(text);
                countingText(text);
              }}
              value={value || ""}
              hasError={false}
              onSubmitEditing={goToAskTotalEmployees}
              maxLength={150}
            />
            <UnderBar lastOne={false} />
            <CountingText>
              {t("askAboutUs.3")} ({counting}/150)
            </CountingText>
          </AboutUsView>
        )}
      />
      <AuthButton
        text={t("askAboutUs.4")}
        disabled={!formState.isValid}
        loading={false}
        onPress={goToAskTotalEmployees}
      />
    </CreateCompanyLayout>
  );
}
