import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Colors";
import ContentInput from "../../../../Components/Post/ContentInput";
import { categories } from "../../../../Constant";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.backgraound};
`;

const HeaderRightText = styled.Text`
  color: ${(props) => (props.ok ? colors.buttonBackground : colors.black)};
  font-size: 16px;
  font-weight: ${(props) => (props.ok ? "bold" : 500)};
  margin-right: 7px;
`;

const ImageTop = styled.View`
  margin: 10px 10px 0px 10px;
`;

const ImageScroll = styled.ScrollView``;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
`;
const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;
const ErrorText = styled.Text`
  margin-left: 3px;
  color: ${colors.error};
`;

const InputBottom = styled.View`
  margin: 0px 10px 10px 10px;
`;
const ImagePick = styled.TouchableOpacity`
  margin: 10px 20px 10px 10px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${colors.borderThick};
`;
const CameraText = styled.Text`
  color: #868b94;
`;

const CategoryView = styled.TouchableOpacity``;

const CategoryContainer = styled.View`
  padding: 15px 7px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled.View`
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;

const DeleteBtn = styled.TouchableOpacity`
  border-radius: 15px;
  position: absolute;
  top: 3px;
  right: -5px;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
`;

export default function UserPostUploadFormPresenter({
  goToCategory,
  categoryId,
  loading,
  uploadUserPostMutation,
}) {
  const { t, i18n } = useTranslation();
  const [photo, setPhoto] = useState([]);
  const [countPhoto, setCountPhoto] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const onValid = ({ content }) => {
    const fileUrl = photo.map((item, index) => {
      return new ReactNativeFile({
        uri: item.uri,
        name: `${index}.jpg`,
        type: "image/jpeg",
      });
    });
    if (!loading) {
      uploadUserPostMutation({
        variables: {
          fileUrl,
          content,
          categoryId,
        },
      });
    }
  };

  const goToImageSelect = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(t("alert.5"));
      } else {
        if (countPhoto < 5) {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            allowsEditing: false,
          });
          if (!result.canceled) {
            if (countPhoto + result?.assets?.length <= 5) {
              result.assets.map(async (item) => {
                const manipResult = await manipulateAsync(
                  item.uri,
                  [
                    {
                      resize: {
                        width: 1080,
                      },
                    },
                  ],
                  { compress: 0.5 }
                );
                setPhoto((photo) => [...photo, { uri: manipResult.uri }]);
              });
              setCountPhoto(countPhoto + result.assets.length);
              setIsOver(false);
            } else {
              setIsOver(true);
            }
          }
        }
      }
      ``;
    }
  };
  const DeleteImg = (index) => {
    const newPhoto = photo.filter((_, i) => i !== index);
    setPhoto(newPhoto);
    setCountPhoto(countPhoto - 1);
    setIsOver(false);
  };

  const NoHeaderRight = () => (
    <TouchableOpacity disabled={true} style={{ marginRight: 10, opacity: 0.5 }}>
      <HeaderRightText>{t("userPostUploadForm.2")}</HeaderRightText>
    </TouchableOpacity>
  );

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText ok={true}>{t("userPostUploadForm.2")}</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading
        ? HeaderRightLoading
        : !formState.isValid || !categoryId
        ? NoHeaderRight
        : OkHeaderRight,
    });
  }, [photo, loading, categoryId, formState.isValid]);

  return (
    <Container>
      <ImageTop>
        <ImageScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          <ImagePick onPress={goToImageSelect}>
            <Ionicons name={"camera"} color={"#868B94"} size={30} />
            <CameraText>{`${countPhoto} / 5`}</CameraText>
          </ImagePick>
          {photo?.length > 0
            ? photo.map((item, index) => {
                return (
                  <ImageContainer key={index}>
                    <Image
                      source={{ uri: item.uri }}
                      style={{ height: 60, width: 60 }}
                    />
                    <DeleteBtn onPress={() => DeleteImg(index)}>
                      <AntDesign name="closecircle" size={16} color="black" />
                    </DeleteBtn>
                  </ImageContainer>
                );
              })
            : null}
        </ImageScroll>
        {isOver && (
          <ErrorContainer>
            <Ionicons
              name="information-circle-outline"
              size={21}
              color={colors.error}
            />
            <ErrorText>{t("userPostUploadForm.3")}</ErrorText>
          </ErrorContainer>
        )}
        <Separator />
      </ImageTop>
      <InputBottom>
        <CategoryView onPress={goToCategory}>
          {categoryId ? (
            categories.map((item, index) => {
              if (categoryId === item.id) {
                return (
                  <CategoryContainer key={index}>
                    <Text>
                      {i18n.language === "vn"
                        ? item.categoryVn
                        : i18n.language === "en"
                        ? item.categoryEn
                        : item.categoryKo}
                    </Text>
                    <Ionicons name="chevron-forward" color="black" size={17} />
                  </CategoryContainer>
                );
              }
            })
          ) : (
            <CategoryContainer>
              <Text>{t("userPostUploadForm.1")}</Text>
              <Ionicons name="chevron-forward" color="black" size={17} />
            </CategoryContainer>
          )}
        </CategoryView>
        <Separator />
        <Controller
          name="content"
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ContentInput
              multiline={true}
              maxLength={1000}
              textAlignVertical={"top"}
              autoCapitalize="none"
              placeholderTextColor="#cccccc"
              onChangeText={(text) => onChange(text)}
              value={value || ""}
              categoryId={categoryId}
            />
          )}
        />
      </InputBottom>
    </Container>
  );
}
