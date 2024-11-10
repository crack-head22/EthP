import { gql } from '@apollo/client';

export const GET_TRANSFERS = gql`
  query GetTransfers {
    transfers(first: 5, orderBy: timestamp, orderDirection: desc) {
      id
      from
      to
      value
      timestamp
    }
  }
`;
