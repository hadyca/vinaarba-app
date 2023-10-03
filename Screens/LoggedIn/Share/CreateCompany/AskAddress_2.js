import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { smallDistrict } from "../../../../DistrictList";
import CreateCompanyLayout from "../../../../Components/CreateCompanyLayout";
import {
  TextInput_Company,
  UnderBar,
} from "../../../../Components/Auth/AuthShared";
import AuthButton from "../../../../Components/Auth/AuthButton";
import ModalSelector from "react-native-modal-selector";
import ProgressCreateCompany from "../../../../Components/Auth/ProgressCreateCompany";

const TextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function AskAddress_2({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [add_2, setAdd_2] = useState("");

  const goToAddress_3 = () => {
    navigation.navigate("AskAddress_3", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      totalEmployees: params.totalEmployees,
      email: params.email,
      contactNumber: params.contactNumber,
      addressStep1: params.addressStep1.value,
      addressStep2: add_2,
    });
  };
  return (
    <CreateCompanyLayout step={"7"}>
      <ProgressCreateCompany title={t("askAddressTwo.1")} />
      <ModalSelector
        data={smallDistrict[params.addressStep1.id]}
        keyExtractor={(item) => item.id}
        labelExtractor={(item) => item.value}
        accessible={true}
        onChange={(item) => {
          setAdd_2(item.value);
        }}
        cancelText={t("askAddressTwo.2")}
        optionContainerStyle={{ height: 500 }}
      >
        <TextView>
          <TextInput_Company
            placeholder="Quận 7"
            placeholderTextColor="#cccccc"
            value={add_2}
          />
          <Ionicons
            name="chevron-forward"
            color="black"
            size={17}
            style={{ paddingTop: 15 }}
          />
        </TextView>
      </ModalSelector>
      <UnderBar lastOne={true} />
      <AuthButton
        text={t("askAddressTwo.3")}
        disabled={!add_2}
        loading={false}
        onPress={goToAddress_3}
      />
    </CreateCompanyLayout>
  );
}
