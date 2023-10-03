import { gql } from "@apollo/client";

export const UPLOAD_COMPANY_POST_MUTATION = gql`
  mutation uploadCompanyPost(
    $fileUrl: [Upload]
    $title: String!
    $mon: Boolean!
    $tue: Boolean!
    $wed: Boolean!
    $thu: Boolean!
    $fri: Boolean!
    $sat: Boolean!
    $sun: Boolean!
    $dayOption: Boolean!
    $startTime: Int!
    $finishTime: Int!
    $timeOption: Boolean!
    $wageTypeId: Int!
    $wage: String!
    $contactNumber: String!
    $email: String!
    $content: String!
  ) {
    uploadCompanyPost(
      fileUrl: $fileUrl
      title: $title
      mon: $mon
      tue: $tue
      wed: $wed
      thu: $thu
      fri: $fri
      sat: $sat
      sun: $sun
      dayOption: $dayOption
      startTime: $startTime
      finishTime: $finishTime
      timeOption: $timeOption
      wageTypeId: $wageTypeId
      wage: $wage
      contactNumber: $contactNumber
      email: $email
      content: $content
    ) {
      id
      company {
        id
        companyName
        aboutUs
        totalEmployees
        email
        contactNumber
        addressStep1
        addressStep2
        addressStep3
      }
      title
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
      content
      totalCompanyPostLikes
      createdAt
      isMine
      file {
        id
        fileUrl
      }
    }
  }
`;
