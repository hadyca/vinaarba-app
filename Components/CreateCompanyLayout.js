import React from "react";
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import { colors } from "../Colors";

const Container = styled.View`
  flex: 1;
  padding: 0px 20px;
  background-color: #ffffff;
`;

const TopContainer = styled.View`
  justify-content: center;
  height: ${(props) => props.height * 0.3}px;
`;

const Logo = styled.Image`
  max-width: 50%;
  margin: 0 auto;
`;
const ProgressContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const Progress = styled.Text`
  font-size: 18px;
  color: ${colors.buttonBackground};
`;

const Count = styled.Text`
  font-size: 18px;
  color: ${colors.borderThick};
`;

export default function CreateCompanyLayout({ step, children }) {
  const { height } = useWindowDimensions();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <TopContainer height={height}>
          <Logo resizeMode="contain" source={require("../assets/logo.png")} />
          {step ? (
            <ProgressContainer>
              <Progress>{step}</Progress>
              <Count>/8</Count>
            </ProgressContainer>
          ) : null}
        </TopContainer>
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
}
