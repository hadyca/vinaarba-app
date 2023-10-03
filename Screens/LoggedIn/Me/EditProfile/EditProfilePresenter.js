import React, { useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator, Alert, Text } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ReactNativeFile } from "apollo-upload-client";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../Colors";
import AuthButton from "../../../../Components/Auth/AuthButton";

const HeaderRightText = styled.Text`
  color: ${(props) => (props.ok ? colors.buttonBackground : colors.black)};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const Container = styled.ScrollView`
  margin: 20px;
`;

const Top = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const AvatarView = styled.View`
  border-radius: 50px;
  border: 0.5px solid ${colors.avatarBorder};
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;

const Background = styled.View`
  position: absolute;
  background-color: black;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  opacity: 0.5;
`;

const ChangePhoto = styled.Text`
  text-align: center;
  margin-top: 10px;
`;

const Bottom = styled.View`
  margin-top: 50px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
`;

const ButtonName = styled.Text``;

const ButtonTextView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  margin-right: 5px;
`;

const AddBio = styled.Text`
  color: ${colors.greyText};
`;

const CompanyTitle = styled.Text`
  margin: 20px 0px 20px 0px;
  font-size: 16px;
  font-weight: bold;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
`;

export default function EditProfilePresenter({
  editAvatarMutation,
  deleteCompanyMutation,
  goToSelectAvatar,
  goToEditUsername,
  goToEditBio,
  goToEditCompanyName,
  goToEditAboutUs,
  goToEditTotalEmployees,
  goToEditCompanyEmail,
  goToEditContactNumber,
  goToEditAddress,
  isEdited,
  avatarUrl,
  username,
  bio,
  myCompany,
  loading,
  deleteLoading,
}) {
  const { t, i18n } = useTranslation();
  const [deletedCompany, setDeletedCompany] = useState(false);
  const address = `${myCompany?.addressStep3}, ${myCompany?.addressStep2}, ${myCompany?.addressStep1}`;

  const navigation = useNavigation();
  const goToEditAvatar = () => {
    if (!isEdited) {
      navigation.pop();
    }
    if (isEdited) {
      const newAvatar = new ReactNativeFile({
        uri: avatarUrl,
        name: `1.jpg`,
        type: "image/jpeg",
      });
      editAvatarMutation({
        variables: {
          avatarUrl: newAvatar,
        },
      });
    }
  };

  const OkHeaderRight = () => (
    <TouchableOpacity
      disabled={false}
      onPress={goToEditAvatar}
      style={{ marginRight: 10, opacity: 1 }}
    >
      <HeaderRightText ok={true}>{t("editProfile.14")}</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : OkHeaderRight,
    });
  }, [loading, avatarUrl, isEdited, deleteLoading]);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Top onPress={goToSelectAvatar}>
        {avatarUrl ? (
          <AvatarView>
            <Avatar resizeMode="cover" source={{ uri: avatarUrl }} />
          </AvatarView>
        ) : (
          <AvatarView>
            <Avatar
              resizeMode="cover"
              source={require("../../../../assets/blankProfile.png")}
            />
          </AvatarView>
        )}
        <Background />
        <Ionicons
          name={"camera-outline"}
          color={"white"}
          size={30}
          style={{ position: "absolute" }}
        />
      </Top>
      <TouchableOpacity onPress={goToSelectAvatar}>
        <ChangePhoto>{t("editProfile.13")}</ChangePhoto>
      </TouchableOpacity>
      <Bottom>
        <Button onPress={goToEditUsername}>
          <ButtonName>{t("editProfile.1")}</ButtonName>
          <ButtonTextView>
            <ButtonText>{username}</ButtonText>
            <Ionicons name="chevron-forward" color="black" size={17} />
          </ButtonTextView>
        </Button>
        <Button onPress={goToEditBio}>
          <ButtonName>{t("editProfile.2")}</ButtonName>
          <ButtonTextView>
            {!bio ? (
              <AddBio>{t("editProfile.17")}</AddBio>
            ) : bio.length >= 20 ? (
              <ButtonText>{`${bio.substring(0, 20)}...`}</ButtonText>
            ) : (
              <ButtonText>{bio}</ButtonText>
            )}
            <Ionicons name="chevron-forward" color="black" size={17} />
          </ButtonTextView>
        </Button>
        <Separator />
        {myCompany && !deletedCompany && (
          <>
            <CompanyTitle>{t("editProfile.3")}</CompanyTitle>
            <Button onPress={goToEditCompanyName}>
              <ButtonName>{t("editProfile.4")}</ButtonName>
              <ButtonTextView>
                <ButtonText>
                  {myCompany?.companyName.length >= 20 ? (
                    <ButtonText>{`${myCompany?.companyName.substring(
                      0,
                      20
                    )}...`}</ButtonText>
                  ) : (
                    <ButtonText>{myCompany?.companyName}</ButtonText>
                  )}
                </ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <Button onPress={goToEditAboutUs}>
              <ButtonName>{t("editProfile.5")}</ButtonName>
              <ButtonTextView>
                <ButtonText>
                  {myCompany?.aboutUs.length >= 20 ? (
                    <ButtonText>{`${myCompany?.aboutUs.substring(
                      0,
                      20
                    )}...`}</ButtonText>
                  ) : (
                    <ButtonText>{myCompany?.aboutUs}</ButtonText>
                  )}
                </ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <Button onPress={goToEditAddress}>
              <ButtonName>{t("editProfile.6")}</ButtonName>
              <ButtonTextView>
                {address.length >= 25 ? (
                  <ButtonText>{`${address.substring(0, 25)}...`}</ButtonText>
                ) : (
                  <ButtonText>{address}</ButtonText>
                )}
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <Button onPress={goToEditTotalEmployees}>
              <ButtonName>{t("editProfile.7")}</ButtonName>
              <ButtonTextView>
                <ButtonText>{`${myCompany?.totalEmployees} ${
                  i18n.language === "en" && myCompany?.totalEmployees > 1
                    ? `${t("editProfile.12")}s`
                    : t("editProfile.12")
                }`}</ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <Button onPress={goToEditCompanyEmail}>
              <ButtonName>{t("editProfile.8")}</ButtonName>
              <ButtonTextView>
                <ButtonText>
                  {myCompany?.email.length >= 20 ? (
                    <ButtonText>{`${myCompany?.email.substring(
                      0,
                      20
                    )}...`}</ButtonText>
                  ) : (
                    <ButtonText>{myCompany?.email}</ButtonText>
                  )}
                </ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <Button onPress={goToEditContactNumber}>
              <ButtonName>{t("editProfile.9")}</ButtonName>
              <ButtonTextView>
                <ButtonText>{myCompany?.contactNumber}</ButtonText>
                <Ionicons name="chevron-forward" color="black" size={17} />
              </ButtonTextView>
            </Button>
            <AuthButton
              onPress={() =>
                Alert.alert(t("editProfile.11"), "", [
                  { text: t("editProfile.16") },
                  {
                    text: t("editProfile.15"),
                    onPress: async () => {
                      setDeletedCompany(true);
                      await deleteCompanyMutation({
                        variables: {
                          companyId: myCompany?.id,
                        },
                      });
                    },
                  },
                ])
              }
              loading={deleteLoading}
              text={t("editProfile.10")}
            />
          </>
        )}
      </Bottom>
    </Container>
  );
}
