import React, { useEffect, useState } from "react";
import * as Device from "expo-device";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { colors } from "../../Colors";
import AuthButton from "../../Components/Auth/AuthButton";
import AuthLayout from "../../Components/Auth/AuthLayout";

const LoginLink = styled.Text`
  color: ${colors.buttonBackground};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

const LngContainer = styled.View`
  margin-top: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LngText = styled.Text`
  color: ${(props) => (props.selected ? colors.blue : colors.borderThick)};
  margin-right: 10px;
`;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Welcome({ navigation }) {
  const { t, i18n } = useTranslation();
  const [pushToken, setPushToken] = useState();
  const [lng, setLng] = useState();
  const changelanguageToVn = async () => {
    i18n.changeLanguage("vn");
    await AsyncStorage.setItem("lng", "vn");
    setLng("vn");
  };

  const changelanguageToEn = async () => {
    i18n.changeLanguage("en");
    await AsyncStorage.setItem("lng", "en");
    setLng("en");
  };
  const changelanguageToKo = async () => {
    i18n.changeLanguage("ko");
    await AsyncStorage.setItem("lng", "ko");
    setLng("ko");
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, [navigation]);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (existingStatus !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      setPushToken(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "VinaArba",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  };

  const goToCreateAccount = () =>
    navigation.navigate("AskUserEmail", {
      pushToken,
      language: lng,
    });
  // const goToCreateAccount = () =>
  //   navigation.navigate("AcceptTerms", {
  //     pushToken,
  //     language: lng,
  //   });
  const goToLogIn = () =>
    navigation.navigate("LogIn", {
      pushToken,
      language: lng,
    });

  useEffect(() => {
    setLng(i18n.language);
  }, []);

  return (
    <AuthLayout>
      <AuthButton
        text={t("welcome.1")}
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>{t("welcome.2")}</LoginLink>
      </TouchableOpacity>
      <LngContainer>
        <TouchableOpacity onPress={changelanguageToVn}>
          <LngText selected={lng === "vn"}>Tiếng Việt</LngText>
        </TouchableOpacity>
        <LngText>|</LngText>
        <TouchableOpacity onPress={changelanguageToEn}>
          <LngText selected={lng === "en"}>English</LngText>
        </TouchableOpacity>
        <LngText>|</LngText>
        <TouchableOpacity onPress={changelanguageToKo}>
          <LngText selected={lng === "ko"}>한국어</LngText>
        </TouchableOpacity>
      </LngContainer>
    </AuthLayout>
  );
}
