import React, { useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { FlatList, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Colors";
import PostFormButton from "../../../../Components/Post/PostFormButton";
import { categories } from "../../../../Constant";

const Container = styled.View`
  flex: 1;
`;

const TopView = styled.View`
  background-color: ${colors.borderThin};
`;

const TopScroll = styled.ScrollView``;

const CategoryTouch = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  border: 1px ${colors.borderThick} solid;
  border-radius: 5px;
  margin: 10px 10px 10px ${(props) => (props.first ? 10 : 0)}px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  height: 35px;
`;

const CategoryText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  text-align: center;
`;

const FetchView = styled.View`
  bottom: 35px;
`;

export default function UserPostListPresenter({
  goToUserPostForm,
  refreshing,
  refresh,
  handleFetch,
  goToCategoryScreen,
  data,
  fetchLoading,
  renderPost,
}) {
  const { i18n } = useTranslation();
  const ref = useRef(null);
  useScrollToTop(ref);
  return (
    <>
      <Container>
        <TopView>
          <TopScroll horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <CategoryTouch
                first={index === 0}
                key={index}
                onPress={() => goToCategoryScreen(item.id)}
              >
                <CategoryText>
                  {i18n.language === "vn"
                    ? item.categoryVn
                    : i18n.language === "en"
                    ? item.categoryEn
                    : item.categoryKo}
                </CategoryText>
              </CategoryTouch>
            ))}
          </TopScroll>
        </TopView>
        <FlatList
          ref={ref}
          onEndReachedThreshold={0.05}
          onEndReached={handleFetch}
          refreshing={refreshing}
          onRefresh={refresh}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={data?.seeAllUserPosts}
          keyExtractor={(item) => "" + item.id}
          renderItem={renderPost}
        />
        {fetchLoading ? (
          <FetchView>
            <ActivityIndicator color="black" />
          </FetchView>
        ) : null}
      </Container>
      <PostFormButton onPress={goToUserPostForm} />
    </>
  );
}
