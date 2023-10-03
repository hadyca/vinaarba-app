import { gql } from "@apollo/client";

export const EDIT_COMPANY_MUTATION = gql`
  mutation editCompany($totalEmployees: Int) {
    editCompany(totalEmployees: $totalEmployees) {
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
