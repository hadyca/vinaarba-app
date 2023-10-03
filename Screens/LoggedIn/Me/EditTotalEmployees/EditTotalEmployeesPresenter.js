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

export default function EditTotalEmployeesPresenter({
  editTotalEmployeesMutation,
  loading,
  originTotalEmployees,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      totalEmployees: String(originTotalEmployees),
    },
    mode: "onChange",
  });

  const onValid = async ({ totalEmployees }) => {
    if (!loading) {
      editTotalEmployeesMutation({
        variables: {
          totalEmployees: parseInt(totalEmployees),
        },
      });
    }
  };

  const NoHeaderRight = () => (
    <TouchableOpacity disabled={true} style={{ marginRight: 10, opacity: 0.5 }}>
      <HeaderRightText>{t("editTotalEmployees.1")}</HeaderRightText>
    </TouchableOpacity>
  );

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText ok={true}>{t("editTotalEmployees.1")}</HeaderRightText>
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
          name="totalEmployees"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: onlyNumber,
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="100"
              placeholderTextColor="#cccccc"
              textAlignVertical={"top"}
              autoCapitalize="none"
              returnKeyType="done"
              keyboardType="number-pad"
              maxLength={7}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
        <UnderBar />
      </Container>
    </DismissKeyboard>
  );
}
