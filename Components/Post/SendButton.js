import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../Colors";

const IconView = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  position: absolute;
  right: 10px;
`;

export default function SendButton({ disabled, onPress, loading }) {
  return loading ? (
    <ActivityIndicator
      size="small"
      color="black"
      style={{ position: "absolute", right: 20 }}
    />
  ) : (
    <IconView disabled={disabled} onPress={onPress}>
      <Ionicons
        name="arrow-forward-circle-outline"
        size={40}
        color={colors.buttonBackground}
      />
    </IconView>
  );
}
