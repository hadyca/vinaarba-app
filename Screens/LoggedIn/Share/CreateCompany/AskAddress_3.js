import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import CreateCompanyLayout from "../../../../Components/CreateCompanyLayout";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import FormError from "../../../../Components/Auth/FormError";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

const CREATE_COMPANY_MUTATION = gql`
  mutation createCompany(
    $companyName: String!
    $aboutUs: String!
    $totalEmployees: Int!
    $email: String!
    $contactNumber: String!
    $addressStep1: String!
    $addressStep2: String!
    $addressStep3: String!
  ) {
    createCompany(
      companyName: $companyName
      aboutUs: $aboutUs
      totalEmployees: $totalEmployees
      email: $email
      contactNumber: $contactNumber
      addressStep1: $addressStep1
      addressStep2: $addressStep2
      addressStep3: $addressStep3
    ) {
      ok
      error
    }
  }
`;

export default function AskAddress_3({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { control, formState, getValues } = useForm({
    mode: "onChange",
  });

  const goToFinish = () => {
    const { addressStep3 } = getValues();
    navigation.navigate("CreateCompanyFinish", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      totalEmployees: params.totalEmployees,
      email: params.email,
      contactNumber: params.contactNumber,
      addressStep1: params.addressStep1,
      addressStep2: params.addressStep2,
      addressStep3: addressStep3,
    });
  };

  return (
    <CreateCompanyLayout step={"8"}>
      <ProgressCreateCompany title={t("askAddressThree.1")} />
      <Controller
        name="addressStep3"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput_Company
            placeholder="Shop S2-1, Lô R16-2, Khu Hưng Vượng 3, Đường số 6"
            placeholderTextColor="#cccccc"
            autoCapitalize="none"
            returnKeyType="done"
            maxLength={100}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={false}
            onSubmitEditing={goToFinish}
          />
        )}
      />
      <UnderBar lastOne={true} />
      <FormError message={formState?.errors?.result?.message} />
      <AuthButton
        text={t("askAddressThree.2")}
        disabled={!formState.isValid}
        loading={false}
        onPress={goToFinish}
      />
    </CreateCompanyLayout>
  );
}
