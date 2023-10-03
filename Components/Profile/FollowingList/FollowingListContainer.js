import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { TOGGLE_FOLLOWING_MUTATION } from "./FollowingListQueries";
import FollowingListPresenter from "./FollowingListPresenter";
import useMe from "../../../Hooks/useMe";
import { Alert } from "react-native";

export default function ({
  id,
  username,
  avatarUrl,
  myCompany,
  isFollowing,
  isMe,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { data: userData } = useMe();
  const updateToggleFollowing = (cache, result) => {
    const {
      data: { toggleFollowing },
    } = result;
    if (toggleFollowing.id) {
      const UserId = `User:${id}`;
      cache.modify({
        id: UserId,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowers(prev) {
            if (isFollowing) {
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
            if (isFollowing) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
    }
  };

  const [toggleFollowingMutation, { loading }] = useMutation(
    TOGGLE_FOLLOWING_MUTATION,
    {
      variables: {
        userId: parseInt(id),
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
    }
  );

  const goToProfile = () => {
    navigation.push("Profile", {
      id,
    });
  };

  return (
    <FollowingListPresenter
      username={username}
      avatarUrl={avatarUrl}
      companyName={myCompany?.companyName}
      isFollowing={isFollowing}
      isMe={isMe}
      goToProfile={goToProfile}
      toggleFollowingMutation={toggleFollowingMutation}
    />
  );
}
