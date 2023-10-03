import React, { useEffect, useState, useRef } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { PROFILE_QUERY, TOGGLE_BLOCKING_MUTATION } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresenter";

export default function ({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(PROFILE_QUERY, {
    variables: {
      userId: parseInt(params.id),
    },
    onError: (error) => {
      if (error.message === "100") {
        Alert.alert(t("alert.2"));
      } else {
        Alert.alert(t("alert.4"));
      }
      navigation.pop();
    },
  });

  const updateToggleBlocking = (cache, result) => {
    const {
      data: { toggleBlocking },
    } = result;
    if (toggleBlocking.id) {
      const UserId = `User:${params.id}`;
      cache.modify({
        id: UserId,
        fields: {
          isBlocking(prev) {
            return !prev;
          },
        },
      });
    }
  };

  const [toggleBlockingMutation] = useMutation(TOGGLE_BLOCKING_MUTATION, {
    variables: {
      userId: parseInt(params.id),
    },
    update: updateToggleBlocking,
    onError: (error) => {
      if (error.message === "100") {
        Alert.alert(t("alert.2"));
      } else {
        Alert.alert(t("alert.4"));
      }
      navigation.pop();
    },
  });

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const goToReportForm = () => {
    navigation.navigate("UserReportForm", {
      id: params.id,
    });
  };

  let actionSheet = useRef();
  let optionArray = [t("profile.14"), t("profile.15"), t("profile.12")];
  let actionSheet2 = useRef();
  let optionArray2 = [t("profile.14"), t("profile.16"), t("profile.12")];

  const showActionSheet = () => {
    if (data?.seeProfile?.isBlocking) {
      return actionSheet2.current.show();
    } else {
      return actionSheet.current.show();
    }
  };

  const handleIndex = async (index) => {
    if (index === 0) {
      goToReportForm();
    } else if (index === 1) {
      await toggleBlockingMutation();
      Alert.alert(t("profile.17"));
    } else {
      return;
    }
  };

  const handleIndex2 = async (index) => {
    if (index === 0) {
      goToReportForm();
    } else if (index === 1) {
      await toggleBlockingMutation();
      Alert.alert(t("profile.18"));
    } else {
      return;
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity onPress={showActionSheet}>
      <Ionicons
        name="ellipsis-vertical"
        color="grey"
        size={20}
        style={{ paddingLeft: 10, paddingRight: 10 }}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      title: loading ? "Loading..." : data?.seeProfile.username,
      headerRight: !loading && !data?.seeProfile?.isMe && HeaderRight,
    });
  }, [data]);

  return (
    <ScreenLayout loading={loading}>
      <ProfilePresenter
        refreshing={refreshing}
        refresh={refresh}
        data={data?.seeProfile}
      />
      <ActionSheet
        ref={actionSheet}
        options={optionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={0}
        onPress={(index) => handleIndex(index)}
      />
      <ActionSheet
        ref={actionSheet2}
        options={optionArray2}
        cancelButtonIndex={2}
        destructiveButtonIndex={0}
        onPress={(index) => handleIndex2(index)}
      />
    </ScreenLayout>
  );
}
