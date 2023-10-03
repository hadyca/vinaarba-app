import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../Screens/LoggedOut/Welcome";
import Login from "../Screens/LoggedOut/LogIn";
import ConfirmSecret from "../Screens/LoggedOut/ConfirmSecret";
import AskUsername from "../Screens/LoggedOut/AskUsername";
import AskPassword from "../Screens/LoggedOut/AskPassword";
import AskUserEmail from "../Screens/LoggedOut/AskUserEmail";
import AcceptTerms from "../Screens/LoggedOut/AcceptTerms";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        title: false,
        headerTransparent: true,
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
        component={Welcome}
      />
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="AskUserEmail" component={AskUserEmail} />
      <Stack.Screen name="ConfirmSecret" component={ConfirmSecret} />
      <Stack.Screen name="AskUsername" component={AskUsername} />
      <Stack.Screen name="AskPassword" component={AskPassword} />
      <Stack.Screen name="AcceptTerms" component={AcceptTerms} />
    </Stack.Navigator>
  );
}
