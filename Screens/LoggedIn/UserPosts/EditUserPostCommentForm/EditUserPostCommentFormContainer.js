import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import EditUserPostCommentFormPresenter from "./EditUserPostCommentFormPresenter";
import { EDIT_COMMENT_MUTATION } from "./EditUserPostCommentFormQueries";

export default function ({ route: { params } }) {
  const [editedPayload, setEditedPayload] = useState("");

  const navigation = useNavigation();

  const updateEditUserPostComment = (cache, result) => {
    console.table(cache);
    const {
      data: {
        editUserPostComment: { ok },
      },
    } = result;
    if (ok) {
      const CommentId = `UserPostComment:${params.commentId}`;
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
    <EditUserPostCommentFormPresenter
      loading={loading}
      editUserPostCommentMutation={editUserPostCommentMutation}
      commentId={params.commentId}
      originalPayload={params.payload}
      handlePayload={handlePayload}
    />
  );
}
