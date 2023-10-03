import { gql } from "@apollo/client";

export const EDIT_AVATAR_MUTATION = gql`
  mutation editProfile($avatarUrl: Upload) {
    editProfile(avatarUrl: $avatarUrl) {
      id
    }
  }
`;

export const DELETE_COMPANY_MUTATION = gql`
  mutation deleteCompany($companyId: Int!) {
    deleteCompany(companyId: $companyId) {
      ok
      error
    }
  }
`;
