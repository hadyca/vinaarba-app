import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import CreateCompanyLayout from "../../../../Components/CreateCompanyLayout";
import AuthButton from "../../../../Components/Auth/AuthButton";
import useMe from "../../../../Hooks/useMe";

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

const Container = styled.View`
  margin-top: 50px;
`;
const TopContainer = styled.View`
  margin-bottom: 30px;
`;
const BottomContainer = styled.View``;
const Title = styled.Text`
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
`;

const Content = styled.Text`
  font-size: 15px;
`;

export default function CreateCompanyFinish({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { refetch } = useMe();

  const { handleSubmit } = useForm();

  const onCompleted = async (data) => {
    const {
      createCompany: { ok },
    } = data;
    if (ok) {
      await refetch();
      navigation.navigate("TabsNav");
    }
  };

  const [createCompanytMutation, { loading }] = useMutation(
    CREATE_COMPANY_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = () => {
    if (!loading) {
      createCompanytMutation({
        variables: {
          companyName: params.companyName,
          aboutUs: params.aboutUs,
          totalEmployees: parseInt(params.totalEmployees),
          email: params.email,
          contactNumber: params.contactNumber,
          addressStep1: params.addressStep1,
          addressStep2: params.addressStep2,
          addressStep3: params.addressStep3,
        },
      });
    }
  };

  return (
    <CreateCompanyLayout>
      <Container>
        <TopContainer>
          <Title>{t("createCompanyFinish.1")}</Title>
          <Content>{t("createCompanyFinish.2")}</Content>
          <Content></Content>
          <Content>{t("createCompanyFinish.3")}</Content>
        </TopContainer>
        <BottomContainer>
          <AuthButton
            text={t("createCompanyFinish.4")}
            disabled={false}
            loading={loading}
            onPress={handleSubmit(onValid)}
          />
        </BottomContainer>
      </Container>
    </CreateCompanyLayout>
  );
}
