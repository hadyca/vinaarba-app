import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../Colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.buttonBackground};
  padding: 15px 7px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  margin-top: ${(props) => (props.lastOne ? 10 : 0)}px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export default function AuthButton({
  onPress,
  disabled,
  text,
  loading,
  lastOne,
}) {
  return (
    <Button disabled={disabled} onPress={onPress} lastOne={lastOne}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
