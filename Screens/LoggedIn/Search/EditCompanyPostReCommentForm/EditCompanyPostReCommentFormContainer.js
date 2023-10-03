import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import EditCompanyPostReCommentFormPresenter from "./EditCompanyPostReCommentFormPresenter";
import { EDIT_COMMENT_MUTATION } from "./EditCompanyPostReCommentFormQueries";

export default function ({ route: { params } }) {
  const [editedPayload, setEditedPayload] = useState("");

  const navigation = useNavigation();

  const updateEditCompanyPostComment = (cache, result) => {
    const {
      data: {
        editCompanyPostReComment: { ok },
      },
    } = result;
    if (ok) {
      const reCommentId = `CompanyPostReComment:${params.reCommentId}`;
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
  const [editCompanyPostCommentMutation, { loading }] = useMutation(
    EDIT_COMMENT_MUTATION,
    {
      update: updateEditCompanyPostComment,
    }
  );
  const handlePayload = (payload) => {
    setEditedPayload(payload);
  };

  return (
    <EditCompanyPostReCommentFormPresenter
      loading={loading}
      reCommentId={params.reCommentId}
      OriginalPayload={params.payload}
      editCompanyPostCommentMutation={editCompanyPostCommentMutation}
      handlePayload={handlePayload}
    />
  );
}
