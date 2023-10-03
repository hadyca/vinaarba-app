import styled from "styled-components/native";
import { colors } from "../../Colors";

export const TextInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  height: 55px;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? colors.error
        : props.focus
        ? colors.focus
        : colors.borderThick};
  margin-bottom: ${(props) => (props.lastOne ? 25 : 8)}px;
`;

export const TextInput_Company = styled.TextInput`
  background-color: white;
  padding: 15px 7px 0px 3px;
  color: black;
`;

export const UnderBar = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThick};
  margin-top: 6px;
  margin-bottom: ${(props) => (props.lastOne ? 25 : props.hasError ? 0 : 2)}px;
`;

export const MultiTextInput = styled.TextInput`
  height: ${(props) => Math.ceil(props.height / 10)}px;
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? colors.error
        : props.focus
        ? colors.focus
        : colors.borderThick};
  margin-bottom: ${(props) => (props.lastOne ? 25 : 8)}px;
`;
