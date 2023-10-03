import React, { useState, useRef, useEffect } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../Components/ScreenLayout";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { useWindowDimensions, Alert, Image } from "react-native";
import { colors } from "../../../Colors";
import { useNavigation } from "@react-navigation/native";
import useMe from "../../../Hooks/useMe";

const Container = styled.View``;
const CompanyView = styled.View`
  background-color: ${colors.buttonBackground};
  justify-content: space-around;
  align-items: center;
`;

const HelloText = styled.Text`
  color: white;
  font-size: 17px;
  margin: 10px 0px;
`;

const Button = styled.TouchableOpacity`
  background-color: white;
  border-radius: 30px;
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: ${colors.buttonBackground};
  align-items: center;
  margin-right: 10px;
`;

const Contents = styled.View`
  justify-content: center;
  align-items: center;
`;

const FooterView = styled.View`
  justify-content: flex-end;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 10px;
`;

const FooterText = styled.Text`
  color: ${colors.borderThick};
`;

export default function Home() {
  const [topHeight, setTopHeight] = useState();
  const [btmHeight, setBtmHeight] = useState();
  const { t, i18n } = useTranslation();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const { data: userData } = useMe();

  const ref = useRef(null);
  useScrollToTop(ref);

  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const goToCreateCompany = () => {
    if (userData?.me?.myCompany) {
      Alert.alert(t("home.3"));
    } else {
      navigation.navigate("AskCompanyName");
    }
  };
  useEffect(() => {
    if (
      lastNotificationResponse?.notification?.request?.content?.data?.userPostId
    ) {
      navigation.navigate("UserPostListDetail", {
        id: lastNotificationResponse.notification.request.content.data
          .userPostId,
      });
    }
    if (
      lastNotificationResponse?.notification?.request?.content?.data
        ?.companyPostId
    ) {
      navigation.navigate("CompanyPostListDetail", {
        id: lastNotificationResponse.notification.request.content.data
          .companyPostId,
      });
    }
    if (
      lastNotificationResponse?.notification?.request?.content?.data?.sendUserId
    ) {
      navigation.navigate("Profile", {
        id: lastNotificationResponse.notification.request.content.data
          .sendUserId,
      });
    }
  }, [lastNotificationResponse]);

  useEffect(() => {
    const topRatio = width / 640;
    const btmRatio = width / 1477;
    setTopHeight(293 * topRatio);
    setBtmHeight(4571 * btmRatio);
  }, [width]);

  return (
    <ScreenLayout>
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        <Container>
          <Image
            source={
              i18n.language === "vn"
                ? require("../../../assets/vn_top.png")
                : i18n.language === "en"
                ? require("../../../assets/en_top.png")
                : require("../../../assets/ko_top.png")
            }
            style={{
              width,
              height: topHeight,
            }}
          />
          <CompanyView>
            <HelloText>{t("home.1")}</HelloText>
            <Button onPress={goToCreateCompany}>
              <ButtonText>{t("home.2")}</ButtonText>
              <Ionicons
                name="chevron-forward"
                color="black"
                size={17}
                style={{ color: colors.buttonBackground }}
              />
            </Button>
          </CompanyView>
          <Contents>
            <Image
              source={
                i18n.language === "vn"
                  ? require("../../../assets/vn_btm.png")
                  : i18n.language === "en"
                  ? require("../../../assets/en_btm.png")
                  : require("../../../assets/ko_btm.png")
              }
              style={{
                width,
                height: btmHeight,
              }}
            />
          </Contents>
          <FooterView>
            <FooterText>©별보는캐리어 All rights reserved</FooterText>
          </FooterView>
        </Container>
      </ScrollView>
    </ScreenLayout>
  );
}
