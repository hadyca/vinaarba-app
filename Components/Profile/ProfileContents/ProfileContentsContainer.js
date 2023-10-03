import React from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { TOGGLE_FOLLOWING_MUTATION } from "./ProfileContentsQueries";
import ProfileContentsPresenter from "./ProfileContentsPresenter";
import useMe from "../../../Hooks/useMe";

export default function ({ data }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { data: userData } = useMe();
  const updateToggleFollowing = (cache, result) => {
    const {
      data: { toggleFollowing },
    } = result;
    if (toggleFollowing.id) {
      const UserId = `User:${data.id}`;
      cache.modify({
        id: UserId,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowers(prev) {
            if (data?.isFollowing) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
      const { me } = userData;
      cache.modify({
        id: `User:${me.id}`,
        fields: {
          totalFollowing(prev) {
            if (data?.isFollowing) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
    }
  };
  const [toggleFollowingMutation] = useMutation(TOGGLE_FOLLOWING_MUTATION, {
    variables: {
      userId: parseInt(data?.id),
    },
    update: updateToggleFollowing,
    onError: (error) => {
      if (error.message === "100") {
        Alert.alert(t("alert.2"));
      } else {
        Alert.alert(t("alert.4"));
      }
      navigation.pop();
    },
  });

  const goToUserPost = () => {
    navigation.push("UserAllUserPost", {
      id: data?.id,
      username: data?.username,
    });
  };

  const goToCompanyPost = () => {
    navigation.push("UserAllCompanyPost", {
      id: data?.myCompany?.id,
      companyName: data?.myCompany?.companyName,
    });
  };

  const goToFollowing = () => {
    navigation.push("FollowNav", {
      id: data?.id,
      username: data?.username,
      screenName: "Following",
    });
  };

  const goToFollowers = () => {
    navigation.push("FollowNav", {
      id: data?.id,
      username: data?.username,
      screenName: "Followers",
    });
  };

  const goToEditProfile = () => {
    navigation.push("EditProfile", {
      username: data?.username,
      bio: data?.bio,
      avatarUrl: data?.avatarUrl,
      myCompany: data?.myCompany,
    });
  };

  return (
    <ProfileContentsPresenter
      data={data}
      goToUserPost={goToUserPost}
      goToCompanyPost={goToCompanyPost}
      goToFollowing={goToFollowing}
      goToFollowers={goToFollowers}
      toggleFollowingMutation={toggleFollowingMutation}
      goToEditProfile={goToEditProfile}
    />
  );
}
