import React, { useEffect } from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import DismissKeyboard from "../../../../Components/DismissKeyBoard";
import { colors } from "../../../../Colors";

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
  width: 100%;
  height: 100%;
  background-color: ${colors.backgraound};
  padding: 13px;
  color: black;
  border: 1px solid ${colors.borderThick};
`;

export default function EditUserPostReCommentFormPresenter({
  loading,
  reCommentId,
  OriginalPayload,
  editCompanyPostCommentMutation,
  handlePayload,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      payload: OriginalPayload,
    },
    mode: "onChange",
  });
  const onValid = ({ payload }) => {
    if (!loading) {
      handlePayload(payload);
      editCompanyPostCommentMutation({
        variables: {
          reCommentId: parseInt(reCommentId),
          payload,
        },
      });
    }
  };
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );
  const NoHeaderRight = () => (
    <TouchableOpacity
      disabled={true}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 0.5 }}
    >
      <HeaderRightText>{t("share.3")}</HeaderRightText>
    </TouchableOpacity>
  );

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={handleSubmit(onValid)}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText ok={true}>{t("share.3")}</HeaderRightText>
    </TouchableOpacity>
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
          name="payload"
          rules={{
            required: "comment is required",
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Please Write Comment"
              placeholderTextColor="#cccccc"
              multiline={true}
              textAlignVertical={"top"}
              maxLength={500}
              maxHeight={120}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </Container>
    </DismissKeyboard>
  );
}
