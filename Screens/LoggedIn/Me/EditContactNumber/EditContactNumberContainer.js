import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_COMPANY_MUTATION } from "./EditContactNumberQueries";
import EditContactNumberPresenter from "./EditContactNumberPresenter";

export default function ({ route: { params } }) {
  const navigation = useNavigation();

  const countingText = (value) => {
    return setCounting(value.length);
  };

  const [editContactNumberMutation, { loading }] = useMutation(
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

  return (
    <ScreenLayout>
      <EditContactNumberPresenter
        editContactNumberMutation={editContactNumberMutation}
        loading={loading}
        originContactNumber={params.myCompany.contactNumber}
      />
    </ScreenLayout>
  );
}
