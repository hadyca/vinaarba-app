import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FollowNav2 from "./FollowNav2";

const Stack = createStackNavigator();

export default function FollowNav({ route: { params } }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FollowNav2"
        options={{
          title: params.username,
          headerBackTitleVisible: false,
        }}
      >
        {() => <FollowNav2 id={params.id} screenName={params.screenName} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
