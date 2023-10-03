import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView, RefreshControl } from "react-native";
import styled from "styled-components/native";
import CompanyCommentForm from "../../../../Components/Post/CompanyCommentForm";
import CompanyPostComment from "../../../../Components/Post/CompanyPostComment";

const CommentContainer = styled.View`
  flex: 1;
`;

export default function ReCommentPresenter({
  refreshing,
  refresh,
  data,
  companyPostId,
  id,
  statusBarHeight,
}) {
  const [commentUploading, setCommentUploading] = useState(false);

  let reCommentRef = useRef();
  const handleReComment = () => {
    setCommentUploading(true);
  };

  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? statusBarHeight + 20 : statusBarHeight + 60
        }
        style={{ flex: 1 }}
      >
        <CommentContainer>
          <ScrollView
            shshowsVerticalScrollIndicator={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
            ref={reCommentRef}
            onContentSizeChange={() => {
              if (
                commentUploading &&
                data?.seeCompanyPostComment?.companyPostReComments.length > 6
              ) {
                setCommentUploading(false);
                reCommentRef.current?.scrollToEnd();
              }
            }}
          >
            <CompanyPostComment
              companyPostId={companyPostId}
              id={data?.seeCompanyPostComment?.id}
              user={data?.seeCompanyPostComment?.user}
              payload={data?.seeCompanyPostComment?.payload}
              isMine={data?.seeCompanyPostComment?.isMine}
              createdAt={data?.seeCompanyPostComment?.createdAt}
              reComments={data?.seeCompanyPostComment?.companyPostReComments}
              reCommentScreen={true}
            />
          </ScrollView>
        </CommentContainer>
        <CompanyCommentForm
          companyPostId={companyPostId}
          companyPostCommentId={id}
          reCommentScreen={true}
          handleReComment={handleReComment}
          commentUploading={commentUploading}
        />
      </KeyboardAvoidingView>
    </>
  );
}
