import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_COMPANY_MUTATION } from "./EditAddressQueries";
import EditAddressPresenter from "./EditAddressPresenter";
import { bigDistrict } from "../../../../DistrictList";

export default function ({ route: { params } }) {
  const [counting, setCounting] = useState(0);
  const [addLoading, setAddLoading] = useState(true);
  const [add_1, setAdd_1] = useState({});
  const [add_2, setAdd_2] = useState("");
  const navigation = useNavigation();

  const countingText = (value) => {
    return setCounting(value.length);
  };

  const [editAddressMutation, { loading }] = useMutation(
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
    if (params.myCompany.addressStep3?.length) {
      setCounting(params.myCompany.addressStep3?.length);
    }
  }, []);
  useEffect(() => {
    const address = bigDistrict.filter(
      (i) => i.value === params.myCompany.addressStep1
    );
    setAdd_1(address[0]);
    setAdd_2(params.myCompany.addressStep2);
    setAddLoading(false);
  }, []);

  const handleAdd1 = (id, value) => {
    setAdd_1({ id, value });
    if (add_1.id !== id) {
      setAdd_2("");
    }
  };

  const handleAdd2 = (value) => {
    setAdd_2(value);
  };

  return (
    <ScreenLayout loading={addLoading}>
      <EditAddressPresenter
        editAddressMutation={editAddressMutation}
        countingText={countingText}
        counting={counting}
        bigDistrict={bigDistrict}
        loading={loading}
        add_1={add_1}
        add_2={add_2}
        originAddressStep3={params.myCompany.addressStep3}
        handleAdd1={handleAdd1}
        handleAdd2={handleAdd2}
      />
    </ScreenLayout>
  );
}
