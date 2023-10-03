import { gql } from "@apollo/client";

export const EDIT_COMPANY_MUTATION = gql`
  mutation editCompany($email: String) {
    editCompany(email: $email) {
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
