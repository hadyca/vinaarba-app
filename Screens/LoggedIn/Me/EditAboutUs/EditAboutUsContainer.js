import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_COMPANY_MUTATION } from "./EditAboutUsQueries";
import EditAboutUsPresenter from "./EditAboutUsPresenter";

export default function ({ route: { params } }) {
  const [counting, setCounting] = useState(0);

  const navigation = useNavigation();

  const countingText = (value) => {
    return setCounting(value.length);
  };

  const [editAboutUsMutation, { loading }] = useMutation(
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
    if (params.myCompany.aboutUs?.length) {
      setCounting(params.myCompany.aboutUs?.length);
    }
  }, []);

  return (
    <ScreenLayout>
      <EditAboutUsPresenter
        editAboutUsMutation={editAboutUsMutation}
        countingText={countingText}
        counting={counting}
        loading={loading}
        originAboutUs={params.myCompany.aboutUs}
      />
    </ScreenLayout>
  );
}
