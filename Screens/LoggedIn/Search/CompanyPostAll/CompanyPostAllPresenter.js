import React, { useState, useRef } from "react";
import {
  FlatList,
  ActivityIndicator,
  Modal,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import PostFormButton from "../../../../Components/Post/PostFormButton";
import { colors } from "../../../../Colors";
import { bigDistrict, smallDistrict } from "../../../../DistrictList";
import { handleAllVn, handleDistrict } from "../../../../apollo";

const FetchView = styled.View`
  bottom: 30px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${colors.backgraound};
  margin-top: 100px;
  border: 1px ${colors.borderThin} solid;
`;

const ModalView = styled.View`
  background-color: ${colors.backgraound};
  width: 100%;
  height: 98%;
`;

const ModalTop = styled.View``;

const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TopText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-left: 10px;
`;

const CountingContainer = styled.View`
  margin-right: 10px;
  flex-direction: row;
`;
const Counting = styled.Text`
  color: ${colors.buttonBackground};
`;
const Counting2 = styled.Text`
  color: ${colors.borderThick};
`;

const TopContainer2 = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const DistrictText = styled.Text`
  flex: 0.45;
  text-align: center;
`;

const DistrictText2 = styled.Text`
  flex: 0.55;
  text-align: center;
`;

const DistrictContainer = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${colors.backgraound};
  border-top-color: ${colors.borderThin};
  border-bottom-color: ${colors.borderThin};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
`;

const FirstScrollView = styled.ScrollView`
  flex: 0.45;
`;

const SecondScrollView = styled.ScrollView`
  flex: 0.55;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.selected ? colors.orangeBackground : colors.backgraound};
  width: 100%;
`;

const BtnTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${(props) =>
    props.selected ? colors.buttonBackground : colors.greyText};
  font-size: 15px;
  margin-left: 10px;
  padding: 15px 2px 15px 2px;
  font-weight: ${(props) => (props.isAll ? "bold" : 600)};
`;

const CheckView = styled.View`
  position: absolute;
  right: 20px;
`;

const ListContainer = styled.View`
  flex-direction: row;
`;

const DistrictSet = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const ListText = styled.Text``;

const DistrictScroll = styled.ScrollView``;

const BottomContainer = styled.View``;
const FinalContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 10px 30px 10px;
`;

const CloseText = styled.Text`
  padding: 5px;
`;

const OkText = styled.Text`
  color: ${colors.buttonBackground};
  padding: 5px;
`;

const TopView = styled.View`
  background-color: ${colors.borderThin};
  /* align-items: flex-start; */ //글씨 크기만큼 박스 크기 길이 조정
`;

const SearchTouch = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  border: 1px ${colors.borderThick} solid;
  border-radius: 5px;
  justify-content: center;
  margin: 10px 50px;
  height: 35px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const SearchText = styled.Text`
  font-size: 12px;
  font-weight: 700;
`;

const PlaceHolder = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.borderThick};
`;

const NoPostText = styled.Text`
  text-align: center;
  margin: 50px auto;
  font-size: 16px;
`;

export default function CompanyPostAllPresenter({
  goToCompanyPostForm,
  handleFetch,
  FHandleFetch,
  AllHandleFetch,
  refreshing,
  refresh,
  FRefresh,
  AllRefresh,
  data,
  FData,
  AllData,
  renderPost,
  fetchLoading,
  companyOwner,
  getData,
  isAllPost,
  getAllData,
  isInit,
  userId,
  list,
  setList,
  setCheck,
  vnAll,
  setVnAll,
  realList,
  setRealList,
  realVnAll,
  setRealVnAll,
}) {
  const { t } = useTranslation();
  const scrollViewRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [districtCode, setDistrictCode] = useState();

  const [allVisible, setAllVisible] = useState(false);

  const existAddress2 = list?.some((el) => el.id === districtCode);
  const existAll = list?.some((el) => el.id === districtCode + 100);
  const isAddress2 = (value) => list?.some((el) => el.value === value);

  const toggleAddress2 = (value) => {
    if (isAddress2(value)) {
      setList(list.filter((el) => el.value !== value));
    } else if (list.length > 4) {
      Alert.alert(t("companyPostAll.10"));
    } else {
      setList([...list, { id: districtCode, value: value }]);
    }
  };

  const handleSubmit = async () => {
    setCheck(true);
    await handleAllVn(userId, vnAll);
    await handleDistrict(userId, ...list);
    if (vnAll) {
      getAllData();
      setRealList([]);
    } else if (list.length > 0) {
      setRealVnAll(false);
      const bigList = list.filter((el) => el.id > 100);
      const smallList = list.filter((el) => el.id < 100);
      getData({
        variables: {
          addressStep1_1: bigList[0]?.value,
          addressStep1_2: bigList[1]?.value,
          addressStep1_3: bigList[2]?.value,
          addressStep1_4: bigList[3]?.value,
          addressStep1_5: bigList[4]?.value,
          addressStep2_1: smallList[0]?.value,
          addressStep2_2: smallList[1]?.value,
          addressStep2_3: smallList[2]?.value,
          addressStep2_4: smallList[3]?.value,
          addressStep2_5: smallList[4]?.value,
        },
      });
    } else {
      getAllData();
      setRealVnAll(false);
      setRealList([]);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalContainer>
          <ModalView>
            <ModalTop>
              <TopContainer>
                <TopText>{t("companyPostAll.1")}</TopText>
                <CountingContainer>
                  <Counting>{vnAll ? "1" : list.length}</Counting>
                  <Counting2>/5</Counting2>
                </CountingContainer>
              </TopContainer>
              <TopContainer2>
                <DistrictText>{t("companyPostAll.5")}</DistrictText>
                <DistrictText2>{t("companyPostAll.6")}</DistrictText2>
              </TopContainer2>
            </ModalTop>
            <DistrictContainer>
              <FirstScrollView showsVerticalScrollIndicator={false}>
                <Button
                  onPress={() => {
                    if (vnAll) {
                      setVnAll(false);
                      setDistrictCode();
                      setAllVisible(false);
                    } else {
                      setVnAll(true);
                      setDistrictCode();
                      setAllVisible(false);
                      setList([]);
                    }
                  }}
                >
                  <BtnTextContainer>
                    <ButtonText selected={vnAll} isAll={true}>
                      {t("companyPostAll.2")}
                    </ButtonText>
                    {vnAll ? (
                      <CheckView>
                        <Ionicons
                          name="checkmark"
                          size={24}
                          color="#f08450"
                          styles={{ marginLeft: 200 }}
                        />
                      </CheckView>
                    ) : null}
                  </BtnTextContainer>
                </Button>
                {bigDistrict.map((item, index) => (
                  <Button
                    selected={districtCode === item.id ? true : false}
                    onPress={() => {
                      setDistrictCode(item.id);
                      setAllVisible(true);
                    }}
                    key={index}
                  >
                    <ButtonText
                      selected={districtCode === item.id ? true : false}
                    >
                      {item.value}
                    </ButtonText>
                  </Button>
                ))}
              </FirstScrollView>
              <SecondScrollView showsVerticalScrollIndicator={false}>
                <View>
                  {allVisible === true ? (
                    <Button
                      onPress={() => {
                        const newDistrict = bigDistrict.filter(
                          (i) => i.id === districtCode
                        );
                        if (existAll) {
                          setList(
                            list.filter((el) => el.id !== districtCode + 100)
                          );
                        } else if (existAddress2) {
                          for (let i = 0; i < list.length; i++) {
                            if (list[i].id === districtCode) {
                              list.splice(i, 1);
                              i--;
                            }
                          }
                          setList([
                            ...list,
                            {
                              id: districtCode + 100,
                              value: newDistrict[0].value,
                            },
                          ]);
                        } else if (list.length > 4) {
                          Alert.alert(t("companyPostAll.10"));
                        } else {
                          setVnAll(false);
                          setList([
                            ...list,
                            {
                              id: districtCode + 100,
                              value: newDistrict[0].value,
                            },
                          ]);
                        }
                      }}
                    >
                      <BtnTextContainer>
                        <ButtonText selected={existAll} isAll={true}>
                          {t("companyPostAll.2")}
                        </ButtonText>
                        {existAll ? (
                          <CheckView>
                            <Ionicons
                              name="checkmark"
                              size={24}
                              color="#f08450"
                            />
                          </CheckView>
                        ) : null}
                      </BtnTextContainer>
                    </Button>
                  ) : null}
                  {districtCode > 0
                    ? smallDistrict[districtCode].map((item, index) => (
                        <Button
                          key={item.id}
                          onPress={() => {
                            if (existAll) {
                              for (let i = 0; i < list.length; i++) {
                                if (list[i].id === districtCode + 100) {
                                  list.splice(i, 1);
                                  i--;
                                }
                              }
                              setList([
                                ...list,
                                { id: districtCode, value: item.value },
                              ]);
                            } else {
                              toggleAddress2(item.value);
                              setVnAll(false);
                            }
                          }}
                        >
                          <BtnTextContainer>
                            <ButtonText
                              key={index}
                              selected={isAddress2(item.value)}
                            >
                              {item.value}
                            </ButtonText>
                            {isAddress2(item.value) ? (
                              <CheckView>
                                <Ionicons
                                  name="checkmark"
                                  size={24}
                                  color="#f08450"
                                />
                              </CheckView>
                            ) : null}
                          </BtnTextContainer>
                        </Button>
                      ))
                    : null}
                </View>
              </SecondScrollView>
            </DistrictContainer>
            <BottomContainer>
              <ListContainer>
                {vnAll ? (
                  <DistrictSet>
                    <ListText>VN {t("companyPostAll.2")}</ListText>
                    <TouchableOpacity onPress={() => setVnAll(false)}>
                      <Ionicons name="close-outline" size={20} color="black" />
                    </TouchableOpacity>
                  </DistrictSet>
                ) : null}
                <DistrictScroll
                  ref={scrollViewRef}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  onContentSizeChange={() =>
                    scrollViewRef.current.scrollToEnd({ animated: true })
                  }
                >
                  {list.map((item, index) => (
                    <DistrictSet key={index}>
                      {item.id > 100 ? (
                        <ListText>
                          {item.value} {t("companyPostAll.2")}
                        </ListText>
                      ) : (
                        <ListText>{item.value}</ListText>
                      )}
                      <TouchableOpacity
                        onPress={() =>
                          setList(list.filter((el) => el.value !== item.value))
                        }
                      >
                        <Ionicons
                          name="close-outline"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    </DistrictSet>
                  ))}
                </DistrictScroll>
              </ListContainer>
              <FinalContainer>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setVnAll(realVnAll);
                    setList(realList);
                  }}
                >
                  <CloseText>{t("companyPostAll.3")}</CloseText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    handleSubmit();
                  }}
                >
                  <OkText>{t("companyPostAll.4")}</OkText>
                </TouchableOpacity>
              </FinalContainer>
            </BottomContainer>
          </ModalView>
        </ModalContainer>
      </Modal>
      <TopView>
        <SearchTouch
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <SearchContainer>
            {realVnAll ? (
              <SearchText>VN {t("companyPostAll.2")}</SearchText>
            ) : realList.length === 1 && realList[0].id > 100 ? (
              <SearchText>
                {realList[0].value} {t("companyPostAll.2")}
              </SearchText>
            ) : realList.length === 1 && realList[0].id < 100 ? (
              <SearchText>{realList[0].value} </SearchText>
            ) : realList.length > 1 && realList[0].id > 100 ? (
              <SearchText>
                {`${realList[0].value} ${t("companyPostAll.2")} ${t(
                  "companyPostAll.7"
                )} ${realList.length - 1}${t("companyPostAll.8")}`}
              </SearchText>
            ) : realList.length > 1 && realList[0].id < 100 ? (
              <SearchText>
                {`${realList[0].value} ${t("companyPostAll.7")} ${
                  realList.length - 1
                }${t("companyPostAll.8")}`}
              </SearchText>
            ) : (
              <PlaceHolder>{t("companyPostAll.11")}</PlaceHolder>
            )}
            <Ionicons name="chevron-down" size={16} color="black" />
          </SearchContainer>
        </SearchTouch>
      </TopView>

      {isInit ? (
        <FlatList
          onEndReachedThreshold={0.05}
          onEndReached={handleFetch}
          refreshing={refreshing}
          onRefresh={refresh}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => "" + item.id}
          renderItem={renderPost}
        />
      ) : isAllPost ? (
        <FlatList
          onEndReachedThreshold={0.05}
          onEndReached={AllHandleFetch}
          refreshing={refreshing}
          onRefresh={AllRefresh}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={AllData}
          keyExtractor={(item) => "" + item.id}
          renderItem={renderPost}
        />
      ) : FData?.length !== 0 ? (
        <FlatList
          onEndReachedThreshold={0.05}
          onEndReached={FHandleFetch}
          refreshing={refreshing}
          onRefresh={FRefresh}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={FData}
          keyExtractor={(item) => "" + item.id}
          renderItem={renderPost}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={FRefresh} />
          }
        >
          <NoPostText>{t("companyPostAll.9")}</NoPostText>
        </ScrollView>
      )}
      {fetchLoading ? (
        <FetchView>
          <ActivityIndicator color="black" />
        </FetchView>
      ) : null}
      {companyOwner ? <PostFormButton onPress={goToCompanyPostForm} /> : null}
    </>
  );
}
