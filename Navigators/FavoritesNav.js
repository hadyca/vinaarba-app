import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import FavoriteUserPost from "../Screens/LoggedIn/Favorites/FavoriteUserPost";
import FavoriteCompanyPost from "../Screens/LoggedIn/Favorites/FavoriteCompanyPost";
import { colors } from "../Colors";

const Tab = createMaterialTopTabNavigator();

export default function FavoritesNav() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.buttonBackground },
      }}
    >
      <Tab.Screen
        name="FavoriteUserPost"
        component={FavoriteUserPost}
        options={{
          title: t("favoritesNav.1"),
        }}
      />
      <Tab.Screen
        name="FavoriteCompanyPost"
        component={FavoriteCompanyPost}
        options={{
          title: t("favoritesNav.2"),
        }}
      />
    </Tab.Navigator>
  );
}
