import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import EditCompanyPostCommentFormPresenter from "./EditCompanyPostCommentFormPresenter";
import { EDIT_COMMENT_MUTATION } from "./EditCompanyPostCommentFormQueries";

export default function ({ route: { params } }) {
  const [editedPayload, setEditedPayload] = useState("");

  const navigation = useNavigation();

  const updateEditCompanyPostComment = (cache, result) => {
    const {
      data: {
        editCompanyPostComment: { ok },
      },
    } = result;
    if (ok) {
      const CommentId = `CompanyPostComment:${params.commentId}`;
      cache.modify({
        id: CommentId,
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
    <EditCompanyPostCommentFormPresenter
      loading={loading}
      editCompanyPostCommentMutation={editCompanyPostCommentMutation}
      commentId={params.commentId}
      originalPayload={params.payload}
      handlePayload={handlePayload}
    />
  );
}
