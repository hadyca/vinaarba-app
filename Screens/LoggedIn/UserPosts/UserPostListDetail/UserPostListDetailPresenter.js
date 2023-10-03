import React, { useRef, useState } from "react";
import {
  Platform,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Colors";
import CommentForm from "../../../../Components/Post/CommentForm";
import PostContents from "../../../../Components/Post/PostContents";

const PostContainer = styled.View`
  flex: 1;
`;
const NoCommentView = styled.View`
  margin-top: 10px;
`;
const NoComment = styled.Text`
  margin: auto;
  font-size: 14px;
  color: ${colors.borderThick};
`;

export default function UserPostDetailPresenter({
  data,
  likeLoading,
  toggleUserPostLikeMutation,
  renderComment,
  refreshing,
  refresh,
  statusBarHeight,
  userPostId,
}) {
  const { t } = useTranslation();
  const [commentUploading, setCommentUploading] = useState(false);

  let detailRef = useRef();

  const handleComment = () => {
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
        {data?.seeUserPost?.userPostComments.length > 0 ? (
          <PostContainer>
            <FlatList
              ListHeaderComponent={
                <PostContents
                  file={data?.seeUserPost?.file}
                  data={data}
                  userId={data?.seeUserPost?.user?.id}
                  username={data?.seeUserPost?.user?.username}
                  avatarUrl={data?.seeUserPost?.user?.avatarUrl}
                  content={data?.seeUserPost?.content}
                  categoryId={data?.seeUserPost?.categoryId}
                  likeLoading={likeLoading}
                  toggleLikeMutation={toggleUserPostLikeMutation}
                  isLiked={data?.seeUserPost?.isLiked}
                />
              }
              refreshing={refreshing}
              onRefresh={refresh}
              showsVerticalScrollIndicator={true}
              data={data?.seeUserPost?.userPostComments}
              keyExtractor={(item) => "" + item.id}
              renderItem={renderComment}
              ref={detailRef}
              initialNumToRender={30}
              onContentSizeChange={() => {
                if (
                  commentUploading &&
                  data?.seeUserPost?.totalUserPostComments > 5
                ) {
                  setCommentUploading(false);
                  detailRef.current?.scrollToEnd({ animated: true });
                  Keyboard.dismiss();
                }
              }}
            />
          </PostContainer>
        ) : (
          <PostContainer>
            <FlatList
              ListHeaderComponent={
                <PostContents
                  file={data?.seeUserPost?.file}
                  data={data}
                  userId={data?.seeUserPost?.user?.id}
                  username={data?.seeUserPost?.user?.username}
                  avatarUrl={data?.seeUserPost?.user?.avatarUrl}
                  content={data?.seeUserPost?.content}
                  categoryId={data?.seeUserPost?.categoryId}
                  likeLoading={likeLoading}
                  toggleLikeMutation={toggleUserPostLikeMutation}
                  isLiked={data?.seeUserPost?.isLiked}
                />
              }
              ListFooterComponent={
                <NoCommentView>
                  <NoComment>{t("userPostListDetail.1")}</NoComment>
                </NoCommentView>
              }
              refreshing={refreshing}
              onRefresh={refresh}
              showsVerticalScrollIndicator={true}
            />
          </PostContainer>
        )}
        <CommentForm
          userPostId={userPostId}
          handleComment={handleComment}
          commentUploading={commentUploading}
        />
      </KeyboardAvoidingView>
    </>
  );
}
