import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../Colors";

export default function ScreenLayout({ loading, children }) {
  return loading ? (
    <View
      style={{
        backgroundColor: colors.backgraound,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color="black" />
    </View>
  ) : (
    <View
      style={{
        backgroundColor: colors.backgraound,
        flex: 1,
      }}
    >
      {children}
    </View>
  );
}
