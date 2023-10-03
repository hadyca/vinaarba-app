import React from "react";
import styled from "styled-components/native";
import { useWindowDimensions, Platform } from "react-native";

const SPostFormButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${(props) => props.bottom / 20}px;
  right: ${(props) => props.right / 15}px;
`;
const ButtonImage = styled.Image`
  width: 70px;
  height: 70px;
`;

export default function PostFormButton({ onPress }) {
  const { width, height } = useWindowDimensions();

  return (
    <SPostFormButton
      platform={Platform.OS}
      onPress={onPress}
      bottom={height}
      right={width}
    >
      <ButtonImage source={require("../../assets/pen.png")} />
    </SPostFormButton>
  );
}
