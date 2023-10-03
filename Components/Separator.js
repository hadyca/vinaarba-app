import React from "react";
import styled from "styled-components/native";
import { colors } from "../Colors";

const SSeparator = styled.View`
  margin-top: 10px;
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
`;

export default function Separator() {
  return <SSeparator />;
}
