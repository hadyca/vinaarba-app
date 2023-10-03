import React, { useEffect, useState } from "react";
import { Image, Platform, Alert } from "react-native";
import styled from "styled-components/native";
import Checkbox from "expo-checkbox";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import ModalSelector from "react-native-modal-selector";
import NumberFormat from "react-number-format";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import { useTranslation } from "react-i18next";
import { ReactNativeFile } from "apollo-upload-client";
import { colors } from "../../../../Colors";
import { time } from "../../../../Constant";
import { typeOfWage } from "../../../../Constant";
import AuthButton from "../../../../Components/Auth/AuthButton";
import { emailRule } from "../../../../RegExp";

const Container = styled.ScrollView`
  background-color: ${colors.backgraound};
`;

const PictureContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const PictureTitle = styled.Text`
  font-weight: bold;
`;

const Title = styled.Text`
  font-weight: bold;
  margin: 40px 0px 10px 0px;
`;

const TitleInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid ${colors.borderThick};
`;

const Opt = styled.Text`
  font-weight: bold;
  color: ${colors.greyText};
`;
const PictureSub = styled.Text`
  color: ${colors.greyText};
`;

const ImageTop = styled.View`
  margin: 10px 10px 0px 10px;
`;

const ImageScroll = styled.ScrollView``;

const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ErrorText = styled.Text`
  margin-left: 3px;
  color: ${colors.error};
`;

const InputBottom = styled.View`
  margin: 0px 10px 10px 10px;
`;
const ImagePick = styled.TouchableOpacity`
  margin: 10px 20px 10px 0px;
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

const DayContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Day = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.selected ? colors.buttonBackground : "white"};
  border-radius: 12.5px;
  border: 0.5px solid ${colors.borderThick};
  width: 40px;
  height: 40px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

const DayText = styled.Text`
  font-weight: bold;
  color: ${(props) => (props.selected ? "white" : "black")};
`;

const FormError = styled.Text`
  color: ${colors.error};
  font-weight: 600;
  font-size: 12px;
  margin-top: 10px;
`;

const TimeTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ModalContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Time = styled.Text`
  width: 45%;
`;

const ModalView = styled.View`
  width: 45%;
  border: 1px solid ${colors.borderThick};
  border-radius: 4px;
`;

const TimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectBox = styled.TextInput`
  color: black;
  padding: 10px;
`;

const Wave = styled.Text`
  width: 10%;
  text-align: center;
`;

const CheckContainer = styled.View`
  margin-top: 15px;
  margin-left: -5px;
  flex-direction: row;
  align-items: center;
`;

const CheckText = styled.Text`
  margin-left: 5px;
`;

const WageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const WageInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 50%;
  border-radius: 4px;
  padding: 10px;
  border: 1px solid ${colors.borderThick};
`;

const WageInput = styled.TextInput`
  width: 100%;
  margin-left: 13px;
`;

const Dong = styled.Text`
  position: absolute;
  left: 0px;
  margin-left: 10px;
`;

const ContentInput = styled.TextInput`
  background-color: white;
  height: 300px;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid ${colors.borderThick};
`;

const SubmitContainer = styled.View`
  justify-content: center;
  margin: 10px auto 20px;
  width: 90%;
  border-top-width: 1px;
  border-top-color: ${colors.borderThin};
  border-style: solid;
`;

export default function CompanyPostUploadFormPresenter({
  loading,
  uploadCompanyPostMutation,
  userData,
}) {
  const { t, i18n } = useTranslation();
  const [mon, setMon] = useState(true);
  const [tue, setTue] = useState(true);
  const [wed, setWed] = useState(true);
  const [thu, setThu] = useState(true);
  const [fri, setFri] = useState(true);
  const [sat, setSat] = useState(true);
  const [sun, setSun] = useState(false);
  const [dayOption, setDayOption] = useState(false);
  const [startTime, setStartTime] = useState({ label: "09:00", value: 540 });
  const [finishTime, setFinishTime] = useState({ label: "18:00", value: 1080 });
  const [timeOption, setTimeOption] = useState(false);
  const [wageType, setWageType] = useState({
    id: 3,
    value: t("companyPostUploadForm.32"),
  });
  const [wageNum, setWageNum] = useState();
  const [photo, setPhoto] = useState([]);
  const [countPhoto, setCountPhoto] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      contactNumber: userData?.me?.myCompany?.contactNumber,
      email: userData?.me?.myCompany?.email,
    },
  });

  const onValid = async ({ title, contactNumber, email, content }) => {
    if (!title) {
      Alert.alert(t("companyPostUploadForm.25"));
    } else if (!contactNumber) {
      Alert.alert(t("companyPostUploadForm.26"));
    } else if (!email) {
      Alert.alert(t("companyPostUploadForm.27"));
    } else if (!emailRule.test(email)) {
      Alert.alert(t("companyPostUploadForm.28"));
    } else if (!wageNum) {
      Alert.alert(t("companyPostUploadForm.29"));
    } else if (!content) {
      Alert.alert(t("companyPostUploadForm.30"));
    } else {
      const fileUrl = await photo.map((item, index) => {
        return new ReactNativeFile({
          uri: photo[index].uri,
          name: `${index}.jpg`,
          type: "image/jpeg",
        });
      });
      if (!loading) {
        uploadCompanyPostMutation({
          variables: {
            fileUrl,
            title,
            mon,
            tue,
            wed,
            thu,
            fri,
            sat,
            sun,
            dayOption,
            startTime: parseInt(startTime.value),
            finishTime: parseInt(finishTime.value),
            timeOption,
            wageTypeId: wageType.id,
            wage: wageNum,
            contactNumber,
            email,
            content,
          },
        });
      }
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
            if (countPhoto + result.assets.length <= 5) {
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
    }
  };
  const DeleteImg = (index) => {
    const newPhoto = photo.filter((_, i) => i !== index);
    setPhoto(newPhoto);
    setCountPhoto(countPhoto - 1);
    setIsOver(false);
  };

  useEffect(() => {
    if (!mon && !tue && !wed && !thu && !fri && !sat && !sun) {
      setError("day", { message: t("companyPostUploadForm.31") });
    }
  }, [mon, tue, wed, thu, fri, sat, sun]);

  return (
    <>
      <Container>
        <KeyboardAwareScrollView extraScrollHeight={50}>
          <ImageTop>
            <PictureContainer>
              <PictureTitle>{t("companyPostUploadForm.1")} </PictureTitle>
              <Opt>{t("companyPostUploadForm.2")}</Opt>
            </PictureContainer>
            <PictureSub>{t("companyPostUploadForm.3")}</PictureSub>
            <ImageScroll
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
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
                          <AntDesign
                            name="closecircle"
                            size={16}
                            color="black"
                          />
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
                <ErrorText>{t("companyPostUploadForm.4")}</ErrorText>
              </ErrorContainer>
            )}
          </ImageTop>
          <InputBottom>
            <Title>{t("companyPostUploadForm.5")}</Title>
            <Controller
              name="title"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TitleInput
                  placeholder={t("companyPostUploadForm.6")}
                  placeholderTextColor="#cccccc"
                  autoCapitalize="none"
                  maxLength={100}
                  multiline={false}
                  returnKeyType="next"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              )}
            />
            <Title>{t("companyPostUploadForm.7")}</Title>
            <Controller
              name="contactNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TitleInput
                  placeholder="0341112222"
                  placeholderTextColor="#cccccc"
                  autoCapitalize="none"
                  returnKeyType="done"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="number-pad"
                  maxLength={17}
                />
              )}
            />
            <Title>{t("companyPostUploadForm.8")}</Title>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TitleInput
                  placeholder="vinaarba@gamil.com"
                  placeholderTextColor="#cccccc"
                  autoCapitalize="none"
                  maxLength={100}
                  multiline={false}
                  returnKeyType="next"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              )}
            />
            <Title>{t("companyPostUploadForm.9")}</Title>
            <DayContainer>
              <Day
                selected={mon}
                onPress={() => {
                  setMon(!mon);
                  clearErrors("day");
                }}
              >
                <DayText selected={mon}>
                  {t("companyPostUploadForm.10")}
                </DayText>
              </Day>
              <Day
                selected={tue}
                onPress={() => {
                  setTue(!tue);
                  clearErrors("day");
                }}
              >
                <DayText selected={tue}>
                  {t("companyPostUploadForm.11")}
                </DayText>
              </Day>
              <Day
                selected={wed}
                onPress={() => {
                  setWed(!wed);
                  clearErrors("day");
                }}
              >
                <DayText selected={wed}>
                  {t("companyPostUploadForm.12")}
                </DayText>
              </Day>
              <Day
                selected={thu}
                onPress={() => {
                  setThu(!thu);
                  clearErrors("day");
                }}
              >
                <DayText selected={thu}>
                  {t("companyPostUploadForm.13")}
                </DayText>
              </Day>
              <Day
                selected={fri}
                onPress={() => {
                  setFri(!fri);
                  clearErrors("day");
                }}
              >
                <DayText selected={fri}>
                  {t("companyPostUploadForm.14")}
                </DayText>
              </Day>
              <Day
                selected={sat}
                onPress={() => {
                  setSat(!sat);
                  clearErrors("day");
                }}
              >
                <DayText selected={sat}>
                  {t("companyPostUploadForm.15")}
                </DayText>
              </Day>
              <Day
                selected={sun}
                onPress={() => {
                  setSun(!sun);
                  clearErrors("day");
                }}
              >
                <DayText selected={sun}>
                  {t("companyPostUploadForm.16")}
                </DayText>
              </Day>
            </DayContainer>

            {errors?.day?.message ? (
              <FormError>{errors?.day?.message}</FormError>
            ) : null}
            <CheckContainer>
              <Checkbox
                value={dayOption}
                onValueChange={setDayOption}
                color={dayOption ? colors.buttonBackground : colors.borderThick}
              />
              <CheckText>{t("companyPostUploadForm.17")}</CheckText>
            </CheckContainer>
            <Title>{t("companyPostUploadForm.18")}</Title>
            <TimeTextContainer>
              <Time>{t("companyPostUploadForm.19")}</Time>
              <Time>{t("companyPostUploadForm.20")}</Time>
            </TimeTextContainer>
            <ModalContainer>
              <ModalView>
                <ModalSelector
                  data={time}
                  keyExtractor={(item) => item.id}
                  labelExtractor={(item) => item.label}
                  accessible={true}
                  onChange={(item) => {
                    setStartTime({ label: item.label, value: item.value });
                  }}
                  optionContainerStyle={{ height: 500 }}
                >
                  <TimeContainer>
                    <SelectBox value={startTime.label} />
                    <Ionicons
                      name="chevron-forward"
                      color="black"
                      size={17}
                      style={{ marginRight: 10 }}
                    />
                  </TimeContainer>
                </ModalSelector>
              </ModalView>
              <Wave>~</Wave>
              <ModalView>
                <ModalSelector
                  data={time}
                  keyExtractor={(item) => item.id}
                  labelExtractor={(item) => item.label}
                  accessible={true}
                  onChange={(item) => {
                    setFinishTime({ label: item.label, value: item.value });
                  }}
                  optionContainerStyle={{ height: 500 }}
                >
                  <TimeContainer>
                    <SelectBox value={finishTime.label} />
                    <Ionicons
                      name="chevron-forward"
                      color="black"
                      size={17}
                      style={{ marginRight: 10 }}
                    />
                  </TimeContainer>
                </ModalSelector>
              </ModalView>
            </ModalContainer>
            <CheckContainer>
              <Checkbox
                value={timeOption}
                onValueChange={setTimeOption}
                color={
                  timeOption ? colors.buttonBackground : colors.borderThick
                }
              />
              <CheckText>{t("companyPostUploadForm.17")}</CheckText>
            </CheckContainer>
            <Title>{t("companyPostUploadForm.21")}</Title>
            <WageContainer>
              <ModalView>
                <ModalSelector
                  data={typeOfWage}
                  keyExtractor={(item) => item.id}
                  labelExtractor={(item) =>
                    i18n.language === "vn"
                      ? item.valueVn
                      : i18n.language === "en"
                      ? item.valueEn
                      : item.valueKo
                  }
                  accessible={true}
                  onChange={(item) => {
                    setWageType({
                      id: item.id,
                      value:
                        i18n.language === "vn"
                          ? item.valueVn
                          : i18n.language === "en"
                          ? item.valueEn
                          : item.valueKo,
                    });
                  }}
                  // optionContainerStyle={{ height: 180 }}
                >
                  <TimeContainer>
                    <SelectBox value={wageType.value} />
                    <Ionicons
                      name="chevron-forward"
                      color="black"
                      size={17}
                      style={{ marginRight: 10 }}
                    />
                  </TimeContainer>
                </ModalSelector>
              </ModalView>
              <Controller
                name="wage"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumberFormat
                    value={value}
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator="NoUse"
                    onValueChange={(values) => {
                      const { value } = values;
                      setWageNum(value);
                    }}
                    renderText={(value) => (
                      <WageInputContainer>
                        <WageInput
                          autoCapitalize="none"
                          returnKeyType="done"
                          onChangeText={onChange}
                          value={value}
                          keyboardType="number-pad"
                          maxLength={17}
                        />
                        <Dong>₫</Dong>
                      </WageInputContainer>
                    )}
                  />
                )}
              />
            </WageContainer>
            <Title>{t("companyPostUploadForm.22")}</Title>
            <Controller
              name="content"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ContentInput
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical={"top"}
                  maxLength={1000}
                  autoCapitalize="none"
                  onChangeText={(text) => onChange(text)}
                  value={value || ""}
                  placeholder={t("companyPostUploadForm.23")}
                  placeholderTextColor="#cccccc"
                />
              )}
            />
          </InputBottom>
        </KeyboardAwareScrollView>
      </Container>
      <SubmitContainer>
        <AuthButton
          text={t("companyPostUploadForm.24")}
          onPress={handleSubmit(onValid)}
          loading={loading}
        />
      </SubmitContainer>
    </>
  );
}
