import { gql } from "@apollo/client";

export const BLOCKING_QUERY = gql`
  query seeBlocking($offset: Int!) {
    seeBlocking(offset: $offset) {
      id
      username
      avatarUrl
      isBlocking
    }
  }
`;
