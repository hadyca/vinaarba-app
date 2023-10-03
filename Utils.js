import { useTranslation } from "react-i18next";

export function timeForToday(value) {
  const { t, i18n } = useTranslation();

  const today = new Date();

  const betweenTime = Math.floor((today.getTime() - value) / 1000 / 60);

  if (betweenTime < 1) return t("time.1");
  if (betweenTime < 60) {
    return i18n.language === "en" && betweenTime > 1
      ? `${betweenTime}${t("time.2")}s ago`
      : i18n.language === "en" && betweenTime === 1
      ? `${betweenTime}${t("time.2")}ago`
      : `${betweenTime}${t("time.2")}`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return i18n.language === "en" && betweenTimeHour > 1
      ? `${betweenTimeHour}${t("time.3")}s ago`
      : i18n.language === "en" && betweenTime === 1
      ? `${betweenTimeHour}${t("time.3")}ago`
      : `${betweenTimeHour}${t("time.3")}`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return i18n.language === "en" && betweenTimeDay > 1
      ? `${betweenTimeDay}${t("time.4")}s ago`
      : i18n.language === "en" && betweenTime === 1
      ? `${betweenTimeDay}${t("time.4")}ago`
      : `${betweenTimeDay}${t("time.4")}`;
  }

  const betweenTiemYear = Math.floor(betweenTimeDay / 365);
  return i18n.language === "en" && betweenTiemYear > 1
    ? `${betweenTiemYear}${t("time.5")}s ago`
    : i18n.language === "en" && betweenTime === 1
    ? `${betweenTiemYear}${t("time.5")}ago`
    : `${betweenTiemYear}${t("time.5")}`;
}
