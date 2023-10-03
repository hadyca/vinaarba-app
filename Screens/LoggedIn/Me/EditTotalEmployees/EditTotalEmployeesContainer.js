import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_COMPANY_MUTATION } from "./EditTotalEmployeesQueries";
import EditTotalEmployeesPresenter from "./EditTotalEmployeesPresenter";

export default function ({ route: { params } }) {
  const navigation = useNavigation();

  const [editTotalEmployeesMutation, { loading }] = useMutation(
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
      <EditTotalEmployeesPresenter
        editTotalEmployeesMutation={editTotalEmployeesMutation}
        loading={loading}
        originTotalEmployees={params.myCompany.totalEmployees}
      />
    </ScreenLayout>
  );
}
