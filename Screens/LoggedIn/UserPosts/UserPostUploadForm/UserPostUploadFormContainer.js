import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import UserPostUploadFormPresenter from "./UserPostUploadFormPresenter";
import { UPLOAD_USER_POST_MUTATION } from "./UserPostUploadFormQueries";
import { ScreenNames } from "../../../../Constant";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const [screenName, setScreenName] = useState("");

  const navigation = useNavigation();
  const { data: userData } = useMe();

  const updateUploadUserPost = (cache, result) => {
    const {
      data: { uploadUserPost },
    } = result;
    if (uploadUserPost.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeAllUserPosts(prev) {
            return [uploadUserPost, ...prev];
          },
          seeUserCategoryPost(prev) {
            return [uploadUserPost, ...prev];
          },
          seeUserAllPosts(prev) {
            return [uploadUserPost, ...prev];
          },
        },
      });
      const { me } = userData;
      const UserId = `User:${me.id}`;
      cache.modify({
        id: UserId,
        fields: {
          totalUserPosts(prev) {
            return prev + 1;
          },
        },
      });
    }

    if (screenName === ScreenNames.USER_POST_LIST) {
      navigation.navigate("UserPostList", {
        id: uploadUserPost.id,
        fromWhere: screenName,
      });
    }

    if (screenName === ScreenNames.CATEGORY_BOARD) {
      navigation.navigate("CategoryBoard", {
        id: uploadUserPost.id,
        categoryId: params.categoryId,
        fromWhere: screenName,
      });
    }
  };
  const [uploadUserPostMutation, { loading }] = useMutation(
    UPLOAD_USER_POST_MUTATION,
    {
      update: updateUploadUserPost,
    }
  );

  const goToCategory = () => navigation.navigate("PostCategory");

  useEffect(() => {
    if (params.screenName) {
      setScreenName(params.screenName);
    }
  }, []);

  return (
    <UserPostUploadFormPresenter
      goToCategory={goToCategory}
      categoryId={params.categoryId}
      loading={loading}
      uploadUserPostMutation={uploadUserPostMutation}
    />
  );
}
