import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import Following from "../Screens/LoggedIn/Share/Following";
import Followers from "../Screens/LoggedIn/Share/Followers";
import { colors } from "../Colors";

const Tab = createMaterialTopTabNavigator();

export default function FollowNav2({ id, screenName }) {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={screenName}
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.buttonBackground },
      }}
    >
      <Tab.Screen
        name="Following"
        options={{
          title: t("profile.3"),
        }}
        children={() => <Following id={id} />}
      />
      <Tab.Screen
        name="Followers"
        options={{
          title: t("profile.4"),
        }}
        children={() => <Followers id={id} />}
      />
    </Tab.Navigator>
  );
}
