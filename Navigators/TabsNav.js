import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../Components/Nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import { colors } from "../Colors";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  return (
    <Tabs.Navigator
      initialRouteName="Home1"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: colors.borderThick,
          backgroundColor: colors.backgraound,
        },
      }}
    >
      <Tabs.Screen
        name="Home1"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Home" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="UserPostList1"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"people"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="UserPostList" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="CompanyPostAll1"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="CompanyPostAll" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="FavoritesNav1"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="FavoritesNav" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Me1"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
