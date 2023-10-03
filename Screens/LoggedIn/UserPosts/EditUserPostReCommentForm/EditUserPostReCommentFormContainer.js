import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import EditUserPostReCommentFormPresenter from "./EditUserPostReCommentFormPresenter";
import { EDIT_COMMENT_MUTATION } from "./EditUserPostReCommentFormQueries";

export default function ({ route: { params } }) {
  const [editedPayload, setEditedPayload] = useState("");

  const navigation = useNavigation();

  const updateEditUserPostComment = (cache, result) => {
    const {
      data: {
        editUserPostReComment: { ok },
      },
    } = result;
    if (ok) {
      const reCommentId = `UserPostReComment:${params.reCommentId}`;
      cache.modify({
        id: reCommentId,
        fields: {
          payload() {
            return editedPayload;
          },
        },
      });
    }
    navigation.pop();
  };
  const [editUserPostCommentMutation, { loading }] = useMutation(
    EDIT_COMMENT_MUTATION,
    {
      update: updateEditUserPostComment,
    }
  );
  const handlePayload = (payload) => {
    setEditedPayload(payload);
  };

  return (
    <EditUserPostReCommentFormPresenter
      loading={loading}
      reCommentId={params.reCommentId}
      OriginalPayload={params.payload}
      editUserPostCommentMutation={editUserPostCommentMutation}
      handlePayload={handlePayload}
    />
  );
}
