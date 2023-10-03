import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import CompanyPostUploadFormPresenter from "./CompanyPostUploadFormPresenter";
import { UPLOAD_COMPANY_POST_MUTATION } from "./CompanyPostUploadFormQueries";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const [screenName, setScreenName] = useState("");

  const navigation = useNavigation();
  const { data: userData } = useMe();

  const updateUploadCompanyPost = (cache, result) => {
    const {
      data: { uploadCompanyPost },
    } = result;

    if (uploadCompanyPost.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCompanyAllPosts(prev) {
            return [uploadCompanyPost, ...prev];
          },
        },
      });
      const { me } = userData;
      const UserId = `User:${me.id}`;
      cache.modify({
        id: UserId,
        fields: {
          totalCompanyPosts(prev) {
            return prev + 1;
          },
        },
      });
    }
    navigation.navigate("CompanyPostAll", {
      id: uploadCompanyPost.id,
      fromWhere: screenName,
    });
  };

  const [uploadCompanyPostMutation, { loading }] = useMutation(
    UPLOAD_COMPANY_POST_MUTATION,
    {
      update: updateUploadCompanyPost,
    }
  );

  useEffect(() => {
    if (params.screenName) {
      setScreenName(params.screenName);
    }
  }, []);

  return (
    <CompanyPostUploadFormPresenter
      loading={loading}
      uploadCompanyPostMutation={uploadCompanyPostMutation}
      userData={userData}
    />
  );
}
