import { gql } from "@apollo/client";

export const COMPANYPOST_QUERY = gql`
  query seeAllCompanyPosts($offset: Int!) {
    seeAllCompanyPosts(offset: $offset) {
      id
      company {
        id
        companyName
        addressStep1
        addressStep2
        user {
          id
          username
          avatarUrl
        }
      }
      title
      content
      workingDay {
        id
        mon
        tue
        wed
        thu
        fri
        sat
        sun
      }
      isBlocking
      dayOption
      startTime
      finishTime
      timeOption
      wageTypeId
      wage
      contactNumber
      email
      createdAt
      totalCompanyPostLikes
      totalCompanyPostComments
    }
  }
`;

export const COMPANYPOST_DISTRICT_QUERY = gql`
  query seeCompanyPostByDistrict(
    $addressStep1_1: String
    $addressStep1_2: String
    $addressStep1_3: String
    $addressStep1_4: String
    $addressStep1_5: String
    $addressStep2_1: String
    $addressStep2_2: String
    $addressStep2_3: String
    $addressStep2_4: String
    $addressStep2_5: String
    $offset: Int!
  ) {
    seeCompanyPostByDistrict(
      addressStep1_1: $addressStep1_1
      addressStep1_2: $addressStep1_2
      addressStep1_3: $addressStep1_3
      addressStep1_4: $addressStep1_4
      addressStep1_5: $addressStep1_5
      addressStep2_1: $addressStep2_1
      addressStep2_2: $addressStep2_2
      addressStep2_3: $addressStep2_3
      addressStep2_4: $addressStep2_4
      addressStep2_5: $addressStep2_5
      offset: $offset
    ) {
      id
      company {
        id
        companyName
        addressStep1
        addressStep2
        user {
          id
          username
          avatarUrl
        }
      }
      isBlocking
      title
      content
      workingDay {
        id
        mon
        tue
        wed
        thu
        fri
        sat
        sun
      }
      dayOption
      startTime
      finishTime
      timeOption
      wageTypeId
      wage
      contactNumber
      email
      createdAt
      totalCompanyPostLikes
      totalCompanyPostComments
    }
  }
`;
