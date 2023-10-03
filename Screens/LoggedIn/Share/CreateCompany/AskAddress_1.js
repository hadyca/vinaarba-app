import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { bigDistrict } from "../../../../DistrictList";
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

export default function AskAddress_1({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [add_1, setAdd_1] = useState({});

  const goToAddress_2 = () => {
    navigation.navigate("AskAddress_2", {
      companyName: params.companyName,
      aboutUs: params.aboutUs,
      totalEmployees: params.totalEmployees,
      email: params.email,
      contactNumber: params.contactNumber,
      addressStep1: add_1,
    });
  };

  return (
    <CreateCompanyLayout step={"6"}>
      <ProgressCreateCompany title={t("askAddressOne.1")} />
      <ModalSelector
        data={bigDistrict}
        keyExtractor={(item) => item.id}
        labelExtractor={(item) => item.value}
        accessible={true}
        onChange={(item) => {
          setAdd_1({ id: item.id, value: item.value });
        }}
        cancelText={t("askAddressOne.2")}
        optionContainerStyle={{ height: 500 }}
      >
        <TextView>
          <TextInput_Company
            placeholder="Hồ Chí Minh"
            placeholderTextColor="#cccccc"
            value={add_1.value}
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
        text={t("askAddressOne.3")}
        disabled={!add_1.value}
        loading={false}
        onPress={goToAddress_2}
      />
    </CreateCompanyLayout>
  );
}
