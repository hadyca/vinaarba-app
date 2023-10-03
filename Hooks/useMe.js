import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      email
      avatarUrl
      bio
      isMe
      alertStatus
      isFollowing
      following {
        id
        username
      }
      followers {
        id
        username
      }
      totalUserPosts
      totalCompanyPosts
      totalFollowers
      totalFollowing
      myCompany {
        id
        companyName
        addressStep1
        addressStep2
        addressStep3
        email
        aboutUs
        contactNumber
        totalEmployees
      }
    }
  }
`;

export default function useMe() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading, refetch } = useQuery(ME_QUERY, {
    skip: !hasToken,
    onError: (error) => {
      if (error.message === "100") {
        Alert.alert(t("alert.2"));
      } else {
        Alert.alert(t("alert.4"));
      }
      navigation.navigate("Home");
    },
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data, loading, refetch };
}
