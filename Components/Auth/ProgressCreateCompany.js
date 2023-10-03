import React from "react";
import styled from "styled-components/native";
import { colors } from "../../Colors";

const TitleView = styled.View`
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  font-size: 18px;
`;

export default function ProgressCreateCompany({ title }) {
  return (
    <TitleView>
      <Title>{title}</Title>
    </TitleView>
  );
}
