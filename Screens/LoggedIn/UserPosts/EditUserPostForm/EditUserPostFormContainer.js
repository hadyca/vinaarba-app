import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import EditUserPostFormPresenter from "./EditUserPostFormPresenter";
import { EDIT_USERPOST_MUTATION } from "./EditUserPostFormQueries";

export default function ({ route: { params } }) {
  const [screenName, setScreenName] = useState("");
  const navigation = useNavigation();

  const update = (cache, result) => {
    const {
      data: {
        editUserPost: { ok, id },
      },
    } = result;
    if (ok) {
      navigation.navigate("UserPostListDetail", {
        id,
        fromWhere: screenName,
        refresh: "refresh",
      });
    }
  };

  const [editUserPostMutation, { loading }] = useMutation(
    EDIT_USERPOST_MUTATION,
    {
      update,
    }
  );

  const goToCategory = () =>
    navigation.navigate("EditPostCategory", { id: params.id });

  useEffect(() => {
    if (params.screenName) {
      setScreenName(params.screenName);
    }
  }, []);

  return (
    <EditUserPostFormPresenter
      content={params.content}
      loading={loading}
      userPostId={params.id}
      categoryId={params.categoryId}
      editUserPostMutation={editUserPostMutation}
      goToCategory={goToCategory}
      file={params.file}
      fileLength={params.file?.length}
    />
  );
}
