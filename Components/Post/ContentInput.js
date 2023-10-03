import React from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { categories } from "../../Constant";

const SContentInput = styled.TextInput`
  padding: 15px 7px;
  color: black;
  min-height: 250px;
`;

export default function ContentInput({
  multiline,
  autoCapitalize,
  onChangeText,
  maxLength,
  value,
  categoryId,
}) {
  const { i18n } = useTranslation();

  return categories.map((item, index) =>
    categoryId === item.id ? (
      <SContentInput
        key={index}
        multiline={multiline}
        placeholder={
          i18n.language === "vn"
            ? item.contentVn
            : i18n.language === "en"
            ? item.contentEn
            : item.contentKo
        }
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        textAlignVertical={"top"}
        onChangeText={onChangeText}
        value={value || ""}
      />
    ) : null
  );
}
