import React, { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Colors";
import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import { UnderBar } from "../../../../Components/Auth/AuthShared";

const HeaderRightText = styled.Text`
  color: ${(props) => (props.ok ? colors.buttonBackground : colors.black)};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const Container = styled.View`
  margin: 10px;
`;
const TextInput = styled.TextInput`
  padding: 15px 7px 0px 3px;
  color: black;
`;

const CountingText = styled.Text`
  color: ${colors.error};
  font-size: 11px;
`;

export default function EditBioPresenter({
  editBioMutation,
  countingText,
  counting,
  loading,
  originBio,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      bio: originBio,
    },
  });

  const onValid = async ({ bio }) => {
    if (!loading) {
      editBioMutation({
        variables: {
          bio,
        },
      });
    }
  };

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText ok={true}>{t("editBio.1")}</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : OkHeaderRight,
    });
  }, [loading]);

  return (
    <DismissKeyboard>
      <Container>
        <Controller
          name="bio"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder={t("editBio.2")}
              placeholderTextColor="#cccccc"
              textAlignVertical={"top"}
              maxLength={150}
              autoCapitalize="none"
              onChangeText={(text) => {
                onChange(text);
                countingText(text);
              }}
              value={value}
            />
          )}
        />
        <UnderBar />
        <CountingText>({counting}/150)</CountingText>
      </Container>
    </DismissKeyboard>
  );
}
