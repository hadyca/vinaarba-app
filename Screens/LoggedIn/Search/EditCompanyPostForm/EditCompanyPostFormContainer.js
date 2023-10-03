import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import EditCompanyPostFormPresenter from "./EditCompanyPostFormPresenter";
import { EDIT_COMPANYPOST_MUTATION } from "./EditCompanyPostFormQueries";

export default function ({ route: { params } }) {
  const navigation = useNavigation();

  const update = (cache, result) => {
    const {
      data: {
        editCompanyPost: { ok, id },
      },
    } = result;
    if (ok) {
      navigation.navigate("CompanyPostListDetail", {
        id,
        refresh: "refresh",
      });
    }
  };

  const [editCompanyPostMutation, { loading }] = useMutation(
    EDIT_COMPANYPOST_MUTATION,
    {
      update,
    }
  );

  return (
    <EditCompanyPostFormPresenter
      title={params.title}
      content={params.content}
      originWorkingDay={params.workingDay}
      originDayOption={params.dayOption}
      originStartTime={params.startTime}
      originFinishTime={params.finishTime}
      originTimeOption={params.timeOption}
      originWageTypeId={params.wageTypeId}
      originWage={params.wage}
      originContactNumber={params.contactNumber}
      originEmail={params.email}
      loading={loading}
      companyPostId={params.id}
      editCompanyPostMutation={editCompanyPostMutation}
      file={params.file}
      fileLength={params.file?.length}
    />
  );
}
