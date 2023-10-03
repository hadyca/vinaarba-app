import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_COMPANY_MUTATION } from "./EditCompanyEmailQueries";
import EditCompanyEmailPresenter from "./EditCompanyEmailPresenter";

export default function ({ route: { params } }) {
  const [counting, setCounting] = useState(0);

  const navigation = useNavigation();

  const countingText = (value) => {
    return setCounting(value.length);
  };

  const [editEmailMutation, { loading }] = useMutation(EDIT_COMPANY_MUTATION, {
    onCompleted: ({ editCompany }) => {
      navigation.navigate("EditProfile", {
        username: params.username,
        bio: params.bio,
        myCompany: editCompany,
      });
    },
  });

  useEffect(() => {
    if (params.myCompany.email?.length) {
      setCounting(params.myCompany.email?.length);
    }
  }, []);

  return (
    <ScreenLayout>
      <EditCompanyEmailPresenter
        editEmailMutation={editEmailMutation}
        countingText={countingText}
        counting={counting}
        loading={loading}
        originEmail={params.myCompany.email}
      />
    </ScreenLayout>
  );
}
