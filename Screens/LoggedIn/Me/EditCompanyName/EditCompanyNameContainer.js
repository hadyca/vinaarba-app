import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_COMPANY_MUTATION } from "./EditCompanyNameQueries";
import EditCompanyNamePresenter from "./EditCompanyNamePresenter";

export default function ({ route: { params } }) {
  const [counting, setCounting] = useState(0);

  const navigation = useNavigation();

  const countingText = (value) => {
    return setCounting(value.length);
  };

  const [editCompanyNameMutation, { loading }] = useMutation(
    EDIT_COMPANY_MUTATION,
    {
      onCompleted: ({ editCompany }) => {
        navigation.navigate("EditProfile", {
          username: params.username,
          bio: params.bio,
          myCompany: editCompany,
        });
      },
    }
  );

  useEffect(() => {
    if (params.myCompany.companyName?.length) {
      setCounting(params.myCompany.companyName?.length);
    }
  }, []);

  return (
    <ScreenLayout>
      <EditCompanyNamePresenter
        editCompanyNameMutation={editCompanyNameMutation}
        countingText={countingText}
        counting={counting}
        loading={loading}
        originCompanyName={params.myCompany.companyName}
      />
    </ScreenLayout>
  );
}
