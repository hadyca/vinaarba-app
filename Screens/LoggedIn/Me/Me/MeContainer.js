import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../../Components/ScreenLayout";
import MePresenter from "./MePresenter";
import useMe from "../../../../Hooks/useMe";
import { colors } from "../../../../Colors";

export default function () {
  const { t } = useTranslation();
  const ref = useRef(null);
  useScrollToTop(ref);
  const { data, loading, refetch } = useMe();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const goToSetting = () => {
    navigation.navigate("MyProfileSetting", {
      email: data?.me.email,
      userId: data?.me.id,
    });
  };

  let myActionsheet = useRef();
  let myOptionArray = [t("profile.11"), t("profile.12")];

  const showActionSheet = () => {
    if (data?.me) {
      return myActionsheet.current.show();
    }
  };

  const myHandleIndex = (index) => {
    if (index === 0) {
      goToSetting();
    } else {
      return;
    }
  };

  const HeaderRight = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => {
          setIsAlert(false);
          navigation.navigate("Notification", { isAlert });
        }}
      >
        <Ionicons
          name="notifications"
          color={isAlert ? colors.buttonBackground : "grey"}
          size={20}
          style={{ paddingLeft: 10, paddingRight: 5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showActionSheet}>
        <Ionicons
          name="ellipsis-vertical"
          color="grey"
          size={20}
          style={{ paddingLeft: 5, paddingRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    if (data?.me?.alertStatus) {
      setIsAlert(true);
    } else {
      setIsAlert(false);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: loading ? "Loading..." : data?.me?.username,
      headerRight: !loading && HeaderRight,
    });
  }, [data, isAlert]);

  return (
    <ScreenLayout loading={loading}>
      <MePresenter refreshing={refreshing} refresh={refresh} data={data?.me} />
      <ActionSheet
        ref={myActionsheet}
        options={myOptionArray}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index) => myHandleIndex(index)}
      />
    </ScreenLayout>
  );
}
