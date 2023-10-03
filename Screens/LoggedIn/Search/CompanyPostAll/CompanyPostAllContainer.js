import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { ScreenNames } from "../../../../Constant";
import {
  COMPANYPOST_QUERY,
  COMPANYPOST_DISTRICT_QUERY,
} from "./CompanyPostAllQueries";
import CompanyPostAllPresenter from "./CompanyPostAllPresenter";
import CompanyPost from "../../../../Components/Post/CompanyPost";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const { data: userData } = useMe();

  const [companyOwner, setCompanyOwner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const [isAllPost, setIsAllPost] = useState(true);
  const [vnAll, setVnAll] = useState(false);
  const [realVnAll, setRealVnAll] = useState(false);
  const [list, setList] = useState([]); //출력용 (전체 + 2번째 지역 list)
  const [realList, setRealList] = useState([]);

  const [check, setCheck] = useState(false);

  const { data, loading, refetch, fetchMore } = useQuery(COMPANYPOST_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const [
    getAllData,
    {
      data: AllData,
      loading: AllLoading,
      refetch: AllRefetch,
      fetchMore: AllFetchMore,
    },
  ] = useLazyQuery(COMPANYPOST_QUERY, {
    variables: {
      offset: 0,
    },
    onCompleted: () => {
      setIsInit(false);
      setIsAllPost(true);
    },
  });

  const [
    getData,
    {
      data: FData,
      loading: FLoading,
      refetch: FRefetch,
      fetchMore: FFetchMore,
    },
  ] = useLazyQuery(COMPANYPOST_DISTRICT_QUERY, {
    variables: {
      offset: 0,
    },
    onCompleted: () => {
      setIsInit(false);
      setIsAllPost(false);
    },
  });

  const renderPost = ({ item }) => {
    if (!item.isBlocking) {
      return <CompanyPost {...item} />;
    } else {
      return;
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const FRefresh = async () => {
    setRefreshing(true);
    await FRefetch();
    setRefreshing(false);
  };

  const AllRefresh = async () => {
    setRefreshing(true);
    await AllRefetch();
    setRefreshing(false);
  };

  const handleFetch = async () => {
    if (loading) {
      return;
    } else {
      setFetchLoading(true);
      await fetchMore({
        variables: {
          offset: data?.seeAllCompanyPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const FHandleFetch = async () => {
    if (FLoading) {
      return;
    } else {
      setFetchLoading(true);
      await FFetchMore({
        variables: {
          offset: FData?.seeCompanyPostByDistrict?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const AllHandleFetch = async () => {
    if (FLoading) {
      return;
    } else {
      setFetchLoading(true);
      await AllFetchMore({
        variables: {
          offset: AllData?.seeAllCompanyPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const goToCompanyPostForm = () => {
    return navigation.navigate("CompanyPostUploadForm", {
      screenName: ScreenNames.COMPANY_POST_ALL,
    });
  };

  useEffect(() => {
    if (params?.fromWhere === ScreenNames.COMPANY_POST_ALL) {
      refetch();
      navigation.navigate("CompanyPostListDetail", {
        id: params?.id,
      });
    } else {
      refetch();
    }
  }, [params]);

  useEffect(() => {
    if (userData?.me?.myCompany?.id) {
      setCompanyOwner(true);
    }
  }, [userData]);

  useEffect(() => {
    const loadData = async () => {
      if (userData) {
        setCheck(false);
        const userDistrict = `${userData?.me?.id}District`;
        const userVnAll = `${userData?.me?.id}VnAll`;
        const resultVnAll = await AsyncStorage.getItem(userVnAll);
        const getVnAll = JSON.parse(resultVnAll);
        const resultDistrict = await AsyncStorage.getItem(userDistrict);
        const getDistrict = JSON.parse(resultDistrict);

        if (getVnAll) {
          setRealVnAll(true);
          setVnAll(true);
        } else if (getDistrict?.length > 0) {
          setRealList(getDistrict);
          setList(getDistrict);
          //화면 뿌려주기용
          const bigList = getDistrict.filter((el) => el.id > 100);
          const smallList = getDistrict.filter((el) => el.id < 100);
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
        }
      }
    };
    loadData();
  }, [check]);

  return (
    <ScreenLayout loading={loading || FLoading || AllLoading}>
      <CompanyPostAllPresenter
        goToCompanyPostForm={goToCompanyPostForm}
        handleFetch={handleFetch}
        AllHandleFetch={AllHandleFetch}
        FHandleFetch={FHandleFetch}
        refreshing={refreshing}
        refresh={refresh}
        AllRefresh={AllRefresh}
        FRefresh={FRefresh}
        data={data?.seeAllCompanyPosts}
        AllData={AllData?.seeAllCompanyPosts}
        FData={FData?.seeCompanyPostByDistrict}
        renderPost={renderPost}
        fetchLoading={fetchLoading}
        getAllData={getAllData}
        getData={getData}
        isInit={isInit}
        isAllPost={isAllPost}
        companyOwner={companyOwner}
        userId={userData?.me?.id}
        list={list}
        setList={setList}
        setCheck={setCheck}
        vnAll={vnAll}
        setVnAll={setVnAll}
        realVnAll={realVnAll}
        setRealVnAll={setRealVnAll}
        realList={realList}
        setRealList={setRealList}
      />
    </ScreenLayout>
  );
}
