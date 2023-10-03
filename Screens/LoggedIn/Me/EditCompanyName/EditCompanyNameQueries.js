import { gql } from "@apollo/client";

export const EDIT_COMPANY_MUTATION = gql`
  mutation editCompany($companyName: String) {
    editCompany(companyName: $companyName) {
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
