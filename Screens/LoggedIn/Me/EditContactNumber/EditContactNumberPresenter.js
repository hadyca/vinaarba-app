import React, { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Colors";
import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import { UnderBar } from "../../../../Components/Auth/AuthShared";
import { onlyNumber } from "../../../../RegExp";

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

export default function EditContactNumberPresenter({
  editContactNumberMutation,
  loading,
  originContactNumber,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      contactNumber: originContactNumber,
    },
    mode: "onChange",
  });

  const onValid = async ({ contactNumber }) => {
    if (!loading) {
      editContactNumberMutation({
        variables: {
          contactNumber,
        },
      });
    }
  };
  const NoHeaderRight = () => (
    <TouchableOpacity disabled={true} style={{ marginRight: 10, opacity: 0.5 }}>
      <HeaderRightText>{t("editContactNumber.1")}</HeaderRightText>
    </TouchableOpacity>
  );

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText ok={true}>{t("editContactNumber.1")}</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading
        ? HeaderRightLoading
        : !formState.isValid
        ? NoHeaderRight
        : OkHeaderRight,
    });
  }, [loading, formState.isValid]);
  return (
    <DismissKeyboard>
      <Container>
        <Controller
          name="contactNumber"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: onlyNumber,
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="0341112222"
              placeholderTextColor="#cccccc"
              textAlignVertical={"top"}
              maxLength={20}
              returnKeyType="done"
              keyboardType="number-pad"
              autoCapitalize="none"
              onChangeText={(text) => {
                onChange(text);
              }}
              value={value}
            />
          )}
        />
        <UnderBar />
      </Container>
    </DismissKeyboard>
  );
}
