import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import TabsNav from "./TabsNav";
import FollowNav from "./FollowNav";
import UserPostUploadForm from "../Screens/LoggedIn/UserPosts/UserPostUploadForm";
import EditUserPostForm from "../Screens/LoggedIn/UserPosts/EditUserPostForm";
import UserPostListDetail from "../Screens/LoggedIn/UserPosts/UserPostListDetail";
import EditUserPostCommentForm from "../Screens/LoggedIn/UserPosts/EditUserPostCommentForm";
import EditUserPostReCommentForm from "../Screens/LoggedIn/UserPosts/EditUserPostReCommentForm";
import Profile from "../Screens/LoggedIn/Share/Profile";
import PostCategory from "../Screens/LoggedIn/UserPosts/PostCategory";
import EditPostCategory from "../Screens/LoggedIn/UserPosts/EditPostCategory";
import CategoryBoard from "../Screens/LoggedIn/UserPosts/CategoryBoard";
import ReComment from "../Screens/LoggedIn/UserPosts/ReComment";
import UserPostReportForm from "../Screens/LoggedIn/UserPosts/UserPostReportForm";
import UserPostCommentReportForm from "../Screens/LoggedIn/UserPosts/UserPostCommentReportForm";
import UserPostReCommentReportForm from "../Screens/LoggedIn/UserPosts/UserPostReCommentReportForm";
import AskCompanyName from "../Screens/LoggedIn/Share/CreateCompany/AskCompanyName";
import AskEmail from "../Screens/LoggedIn/Share/CreateCompany/AskEmail";
import AskAboutUs from "../Screens/LoggedIn/Share/CreateCompany/AskAboutUs";
import AskContactNumber from "../Screens/LoggedIn/Share/CreateCompany/AskContactNumber";
import AskTotalEmployees from "../Screens/LoggedIn/Share/CreateCompany/AskTotalEmployees";
import AskAddress_1 from "../Screens/LoggedIn/Share/CreateCompany/AskAddress_1";
import AskAddress_2 from "../Screens/LoggedIn/Share/CreateCompany/AskAddress_2";
import AskAddress_3 from "../Screens/LoggedIn/Share/CreateCompany/AskAddress_3";
import CreateCompanyFinish from "../Screens/LoggedIn/Share/CreateCompany/CreateCompanyFinish";
import CompanyPostUploadForm from "../Screens/LoggedIn/Search/CompanyPostUploadForm";
import CompanyPostListDetail from "../Screens/LoggedIn/Search/CompanyPostListDetail";
import EditCompanyPostForm from "../Screens/LoggedIn/Search/EditCompanyPostForm";
import CompanyReComment from "../Screens/LoggedIn/Search/CompanyReComment";
import EditCompanyPostCommentForm from "../Screens/LoggedIn/Search/EditCompanyPostCommentForm";
import EditCompanyPostReCommentForm from "../Screens/LoggedIn/Search/EditCompanyPostReCommentForm";
import CompanyPostReportForm from "../Screens/LoggedIn/Search/CompanyPostReportForm";
import CompanyPostCommentReportForm from "../Screens/LoggedIn/Search/CompanyPostCommentReportForm";
import CompanyPostReCommentReportForm from "../Screens/LoggedIn/Search/CompanyPostReCommentReportForm";
import EditProfile from "../Screens/LoggedIn/Me/EditProfile";
import EditUsername from "../Screens/LoggedIn/Me/EditUsername";
import EditBio from "../Screens/LoggedIn/Me/EditBio";
import MyProfileSetting from "../Screens/LoggedIn/Me/MyProfileSetting";
import UserReportForm from "../Screens/LoggedIn/Share/UserReportForm";
import UserAllUserPost from "../Screens/LoggedIn/Share/UserAllUserPost";
import UserAllCompanyPost from "../Screens/LoggedIn/Share/UserAllCompanyPost";
import EditCompanyName from "../Screens/LoggedIn/Me/EditCompanyName";
import EditAboutUs from "../Screens/LoggedIn/Me/EditAboutUs";
import EditTotalEmployees from "../Screens/LoggedIn/Me/EditTotalEmployees";
import EditCompanyEmail from "../Screens/LoggedIn/Me/EditCompanyEmail";
import EditContactNumber from "../Screens/LoggedIn/Me/EditContactNumber";
import EditAddress from "../Screens/LoggedIn/Me/EditAddress";
import Account from "../Screens/LoggedIn/Me/Account";
import Contact from "../Screens/LoggedIn/Me/Contact";
import Notification from "../Screens/LoggedIn/Me/Notification";
import NotificationSetting from "../Screens/LoggedIn/Me/NotificationSetting";
import BlockUserList from "../Screens/LoggedIn/Me/BlockUserList";
import Language from "../Screens/LoggedIn/Me/Language";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="TabsNav">
      <Stack.Screen
        name="TabsNav"
        options={{
          headerShown: false,
        }}
        component={TabsNav}
      />
      <Stack.Screen
        name="FollowNav"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        component={FollowNav}
      />
      <Stack.Screen
        name="Contact"
        options={{
          title: t("header.contact"),
          headerBackTitleVisible: false,
        }}
        component={Contact}
      />
      <Stack.Screen
        name="Language"
        options={{
          title: t("header.language"),
          headerBackTitleVisible: false,
        }}
        component={Language}
      />
      <Stack.Screen
        name="NotificationSetting"
        options={{
          title: t("header.notificationSetting"),
          headerBackTitleVisible: false,
        }}
        component={NotificationSetting}
      />
      <Stack.Screen
        name="BlockUserList"
        options={{
          title: t("header.blockUserList"),
          headerBackTitleVisible: false,
        }}
        component={BlockUserList}
      />
      <Stack.Screen
        name="Notification"
        options={{
          title: t("header.notification"),
          headerBackTitleVisible: false,
        }}
        component={Notification}
      />
      <Stack.Screen
        name="Account"
        options={{
          title: t("header.account"),
          headerBackTitleVisible: false,
        }}
        component={Account}
      />
      <Stack.Screen
        name="EditAddress"
        options={{
          title: t("header.editAddress"),
          headerBackTitleVisible: false,
        }}
        component={EditAddress}
      />
      <Stack.Screen
        name="EditContactNumber"
        options={{
          title: t("header.editContactNumber"),
          headerBackTitleVisible: false,
        }}
        component={EditContactNumber}
      />
      <Stack.Screen
        name="EditCompanyEmail"
        options={{
          title: t("header.editCompanyEmail"),
          headerBackTitleVisible: false,
        }}
        component={EditCompanyEmail}
      />
      <Stack.Screen
        name="EditTotalEmployees"
        options={{
          title: t("header.editTotalEmployees"),
          headerBackTitleVisible: false,
        }}
        component={EditTotalEmployees}
      />
      <Stack.Screen
        name="EditCompanyName"
        options={{
          title: t("header.editCompanyName"),
          headerBackTitleVisible: false,
        }}
        component={EditCompanyName}
      />
      <Stack.Screen
        name="EditAboutUs"
        options={{
          title: t("header.editAboutUs"),
          headerBackTitleVisible: false,
        }}
        component={EditAboutUs}
      />
      <Stack.Screen
        name="UserAllCompanyPost"
        options={{
          headerBackTitleVisible: false,
        }}
        component={UserAllCompanyPost}
      />
      <Stack.Screen
        name="UserAllUserPost"
        options={{
          headerBackTitleVisible: false,
        }}
        component={UserAllUserPost}
      />
      <Stack.Screen
        name="EditProfile"
        options={{
          title: t("header.editProfile"),
          headerBackTitleVisible: false,
        }}
        component={EditProfile}
      />
      <Stack.Screen
        name="UserReportForm"
        options={{
          title: t("header.userReportForm"),
          headerBackTitleVisible: false,
        }}
        component={UserReportForm}
      />
      <Stack.Screen
        name="MyProfileSetting"
        options={{
          title: t("header.myProfileSetting"),
          headerBackTitleVisible: false,
        }}
        component={MyProfileSetting}
      />
      <Stack.Screen
        name="EditUsername"
        options={{
          title: t("header.editUsername"),
          headerBackTitleVisible: false,
        }}
        component={EditUsername}
      />
      <Stack.Screen
        name="EditBio"
        options={{
          title: t("header.editBio"),
          headerBackTitleVisible: false,
        }}
        component={EditBio}
      />
      <Stack.Screen
        name="CompanyPostCommentReportForm"
        options={{
          title: t("header.companyPostCommentReportForm"),
          headerBackTitleVisible: false,
        }}
        component={CompanyPostCommentReportForm}
      />
      <Stack.Screen
        name="CompanyPostReCommentReportForm"
        options={{
          title: t("header.companyPostReCommentReportForm"),
          headerBackTitleVisible: false,
        }}
        component={CompanyPostReCommentReportForm}
      />
      <Stack.Screen
        name="CompanyPostReportForm"
        options={{
          title: t("header.companyPostReportForm"),
          headerBackTitleVisible: false,
        }}
        component={CompanyPostReportForm}
      />
      <Stack.Screen
        name="EditCompanyPostCommentForm"
        options={{
          title: t("header.editCompanyPostCommentForm"),
          headerBackTitleVisible: false,
        }}
        component={EditCompanyPostCommentForm}
      />
      <Stack.Screen
        name="EditCompanyPostReCommentForm"
        options={{
          title: t("header.editCompanyPostReCommentForm"),
          headerBackTitleVisible: false,
        }}
        component={EditCompanyPostReCommentForm}
      />
      <Stack.Screen
        name="CompanyReComment"
        options={{
          title: t("header.companyReComment"),
          headerBackTitleVisible: false,
        }}
        component={CompanyReComment}
      />
      <Stack.Screen
        name="EditCompanyPostForm"
        options={{
          title: t("header.editCompanyPostForm"),
          headerBackTitleVisible: false,
        }}
        component={EditCompanyPostForm}
      />
      <Stack.Screen
        name="CompanyPostListDetail"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={CompanyPostListDetail}
      />
      <Stack.Screen
        name="CompanyPostUploadForm"
        options={{
          title: t("header.companyPostUploadForm"),
          headerBackTitleVisible: false,
        }}
        component={CompanyPostUploadForm}
      />
      <Stack.Screen
        name="CreateCompanyFinish"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={CreateCompanyFinish}
      />
      <Stack.Screen
        name="AskAddress_1"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={AskAddress_1}
      />
      <Stack.Screen
        name="AskAddress_2"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={AskAddress_2}
      />
      <Stack.Screen
        name="AskAddress_3"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={AskAddress_3}
      />
      <Stack.Screen
        name="AskTotalEmployees"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={AskTotalEmployees}
      />
      <Stack.Screen
        name="UserPostListDetail"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={UserPostListDetail}
      />
      <Stack.Screen
        name="Profile"
        options={{
          headerBackTitleVisible: false,
        }}
        component={Profile}
      />
      <Stack.Screen
        name="UserPostUploadForm"
        options={{
          title: t("header.userPostUploadForm"),
          headerBackTitleVisible: false,
        }}
        component={UserPostUploadForm}
      />
      <Stack.Screen
        name="PostCategory"
        options={{
          title: t("header.postCategory"),
          headerBackTitleVisible: false,
        }}
        component={PostCategory}
      />
      <Stack.Screen
        name="EditPostCategory"
        options={{
          title: t("header.editPostCategory"),
          headerBackTitleVisible: false,
        }}
        component={EditPostCategory}
      />
      <Stack.Screen
        name="EditUserPostForm"
        options={{
          title: t("header.editUserPostForm"),
          headerBackTitleVisible: false,
        }}
        component={EditUserPostForm}
      />
      <Stack.Screen
        name="EditUserPostCommentForm"
        options={{
          title: t("header.editUserPostCommentForm"),
          headerBackTitleVisible: false,
        }}
        component={EditUserPostCommentForm}
      />
      <Stack.Screen
        name="EditUserPostReCommentForm"
        options={{
          title: t("header.editUserPostReCommentForm"),
          headerBackTitleVisible: false,
        }}
        component={EditUserPostReCommentForm}
      />
      <Stack.Screen
        name="CategoryBoard"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CategoryBoard}
      />
      <Stack.Screen
        name="ReComment"
        options={{
          title: t("header.reComment"),
          headerBackTitleVisible: false,
        }}
        component={ReComment}
      />
      <Stack.Screen
        name="UserPostReportForm"
        options={{
          title: t("header.userPostReportForm"),
          headerBackTitleVisible: false,
        }}
        component={UserPostReportForm}
      />
      <Stack.Screen
        name="UserPostCommentReportForm"
        options={{
          title: t("header.userPostCommentReportForm"),
          headerBackTitleVisible: false,
        }}
        component={UserPostCommentReportForm}
      />
      <Stack.Screen
        name="UserPostReCommentReportForm"
        options={{
          title: t("header.userPostReCommentReportForm"),
          headerBackTitleVisible: false,
        }}
        component={UserPostReCommentReportForm}
      />
      <Stack.Screen
        name="AskCompanyName"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={AskCompanyName}
      />
      <Stack.Screen
        name="AskEmail"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={AskEmail}
      />
      <Stack.Screen
        name="AskContactNumber"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={AskContactNumber}
      />
      <Stack.Screen
        name="AskAboutUs"
        options={{
          title: false,
          headerBackTitleVisible: false,
        }}
        component={AskAboutUs}
      />
    </Stack.Navigator>
  );
}
