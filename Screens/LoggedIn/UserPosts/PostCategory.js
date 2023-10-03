import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../Components/ScreenLayout";
import { colors } from "../../../Colors";
import { categories } from "../../../Constant";

const Container = styled.View``;

const CategoryContainer = styled.View``;

const CategoryView = styled.TouchableOpacity`
  padding: 25px 15px;
  color: black;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
`;
const CategoryText = styled.Text``;

export default function PostCategory() {
  const { i18n } = useTranslation();
  const navigation = useNavigation();
  const selectCategory = (item) => {
    navigation.navigate("UserPostUploadForm", {
      categoryId: item.id,
    });
  };
  return (
    <ScreenLayout>
      <Container>
        {categories.map((item, index) => (
          <CategoryContainer key={index}>
            <CategoryView onPress={() => selectCategory(item)}>
              <CategoryText>
                {i18n.language === "vn"
                  ? item.categoryVn
                  : i18n.language === "en"
                  ? item.categoryEn
                  : item.categoryKo}
              </CategoryText>
            </CategoryView>
            <Separator />
          </CategoryContainer>
        ))}
      </Container>
    </ScreenLayout>
  );
}
