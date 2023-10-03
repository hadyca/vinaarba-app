import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { time, typeOfWage } from "../../Constant";
import { colors } from "../../Colors";

const BaseDataContainer = styled.View`
  margin-top: 10px;
`;

const DataContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 5px;
`;

const BaseText = styled.Text`
  color: ${colors.greyText};
  margin-left: 5px;
`;

export default function BaseInfo({
  wageTypeId,
  wage,
  workingDay,
  dayOption,
  startTime,
  finishTime,
  timeOption,
  contactNumber,
  email,
}) {
  const { t, i18n } = useTranslation();
  const [commaWage, setCommaWage] = useState();
  const [dayArray, setDayArray] = useState([]);
  const [start, setStart] = useState();
  const [finish, setFinish] = useState();

  useEffect(() => {
    let newAry = [];
    workingDay?.mon && newAry.push(t("companyPostAll.16"));
    workingDay?.tue && newAry.push(t("companyPostAll.17"));
    workingDay?.wed && newAry.push(t("companyPostAll.18"));
    workingDay?.thu && newAry.push(t("companyPostAll.19"));
    workingDay?.fri && newAry.push(t("companyPostAll.20"));
    workingDay?.sat && newAry.push(t("companyPostAll.21"));
    workingDay?.sun && newAry.push(t("companyPostAll.22"));
    setDayArray(newAry);
  }, [i18n.language, workingDay]);

  useEffect(() => {
    const startTimeTrans = time.filter((item) => item.value === startTime);
    setStart(startTimeTrans[0]?.label);

    const finishTimeTrans = time.filter((item) => item.value === finishTime);
    setFinish(finishTimeTrans[0]?.label);
  }, [startTime, finishTime]);

  useEffect(() => {
    const commaTrans = wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setCommaWage(commaTrans);
  }, [wage]);

  return (
    <BaseDataContainer>
      <DataContainer>
        <FontAwesome
          name="money"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        {typeOfWage.map((item, index) => {
          if (wageTypeId === item.id) {
            return i18n.language === "vn" ? (
              <BaseText key={index}>{item.valueVn}</BaseText>
            ) : i18n.language === "en" ? (
              <BaseText key={index}>{item.valueEn}</BaseText>
            ) : (
              <BaseText key={index}>{item.valueKo}</BaseText>
            );
          }
        })}
        <BaseText>₫ {commaWage}</BaseText>
      </DataContainer>
      <DataContainer>
        <FontAwesome
          name="calendar"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        {workingDay?.mon &&
        workingDay?.tue &&
        workingDay?.wed &&
        workingDay?.thu &&
        workingDay?.fri &&
        workingDay?.sat &&
        workingDay?.sun ? (
          <BaseText>
            {`${t("companyPostAll.16")}~${t("companyPostAll.22")}`}
          </BaseText>
        ) : workingDay?.mon &&
          workingDay?.tue &&
          workingDay?.wed &&
          workingDay?.thu &&
          workingDay?.fri &&
          workingDay?.sat ? (
          <BaseText>
            {`${t("companyPostAll.16")}~${t("companyPostAll.21")}`}
          </BaseText>
        ) : workingDay?.mon &&
          workingDay?.tue &&
          workingDay?.wed &&
          workingDay?.thu &&
          workingDay?.fri ? (
          <BaseText>
            {`${t("companyPostAll.16")}~${t("companyPostAll.20")}`}
          </BaseText>
        ) : (
          dayArray.map((item, index) => {
            if (index === 0) {
              return <BaseText key={index}>{item}</BaseText>;
            } else {
              return <BaseText key={index}>{item}</BaseText>;
            }
          })
        )}
        {dayOption ? <BaseText>{t("companyPostAll.23")}</BaseText> : null}
      </DataContainer>
      <DataContainer>
        <MaterialIcons
          name="schedule"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        <BaseText>
          {start}~{finish}
        </BaseText>
        {timeOption ? <BaseText>{t("companyPostAll.23")}</BaseText> : null}
      </DataContainer>
      <DataContainer>
        <Entypo
          name="mobile"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        <BaseText>{contactNumber}</BaseText>
      </DataContainer>
      <DataContainer>
        <MaterialIcons
          name="email"
          size={18}
          color={colors.greyText}
          style={{ width: 25 }}
        />
        <BaseText>{email}</BaseText>
      </DataContainer>
    </BaseDataContainer>
  );
}
