import { gql } from "@apollo/client";

export const EDIT_COMPANY_MUTATION = gql`
  mutation editCompany(
    $addressStep1: String
    $addressStep2: String
    $addressStep3: String
  ) {
    editCompany(
      addressStep1: $addressStep1
      addressStep2: $addressStep2
      addressStep3: $addressStep3
    ) {
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
  }
`;
