import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../../Components/ScreenLayout";
import {
  EDIT_AVATAR_MUTATION,
  DELETE_COMPANY_MUTATION,
} from "./EditProfileQueries";
import EditProfilePresenter from "./EditProfilePresenter";

export default function ({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isEdited, setIsEdited] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const [editAvatarMutation, { loading }] = useMutation(EDIT_AVATAR_MUTATION, {
    onCompleted: () => navigation.pop(),
  });

  const updateDeleteCompany = (cache, result) => {
    const {
      data: {
        deleteCompany: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "me",
      });
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "seeAllCompanyPosts",
      });
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: "seeCompanyPostByDistrict",
      });
    }
  };

  const [deleteCompanyMutation, { loading: deleteLoading }] = useMutation(
    DELETE_COMPANY_MUTATION,
    {
      update: updateDeleteCompany,
    }
  );

  const goToSelectAvatar = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(t("alert.5"));
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: false,
          allowsEditing: false,
        });
        if (!result.canceled) {
          const manipResult = await manipulateAsync(
            result.assets[0].uri,
            [
              {
                resize: {
                  width: 1080,
                },
              },
            ],
            { compress: 0.5 }
          );
          setAvatarUrl(manipResult.uri);
          setIsEdited(true);
        }
      }
    }
  };

  const goToEditUsername = () => {
    navigation.navigate("EditUsername", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditBio = () => {
    navigation.navigate("EditBio", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditCompanyName = () => {
    navigation.navigate("EditCompanyName", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditAboutUs = () => {
    navigation.navigate("EditAboutUs", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditTotalEmployees = () => {
    navigation.navigate("EditTotalEmployees", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditCompanyEmail = () => {
    navigation.navigate("EditCompanyEmail", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditContactNumber = () => {
    navigation.navigate("EditContactNumber", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  const goToEditAddress = () => {
    navigation.navigate("EditAddress", {
      username: params.username,
      bio: params.bio,
      myCompany: params.myCompany,
    });
  };

  useEffect(() => {
    if (params.avatarUrl) {
      setAvatarUrl(params.avatarUrl);
    } else {
      return;
    }
  }, []);

  return (
    <ScreenLayout>
      <EditProfilePresenter
        editAvatarMutation={editAvatarMutation}
        deleteCompanyMutation={deleteCompanyMutation}
        goToSelectAvatar={goToSelectAvatar}
        goToEditUsername={goToEditUsername}
        goToEditBio={goToEditBio}
        goToEditCompanyName={goToEditCompanyName}
        goToEditAboutUs={goToEditAboutUs}
        goToEditTotalEmployees={goToEditTotalEmployees}
        goToEditCompanyEmail={goToEditCompanyEmail}
        goToEditContactNumber={goToEditContactNumber}
        goToEditAddress={goToEditAddress}
        isEdited={isEdited}
        avatarUrl={avatarUrl}
        username={params.username}
        bio={params.bio}
        myCompany={params.myCompany}
        loading={loading}
        deleteLoading={deleteLoading}
      />
    </ScreenLayout>
  );
}
