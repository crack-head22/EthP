import axios from 'axios';

const graphqlEndpoint = 'https://api.studio.thegraph.com/query/94122/usdc-transfer-tracker/version/latest'; // Replace with your actual subgraph endpoint

export const fetchTransfers = async () => {
  const response = await axios.post(graphqlEndpoint, {
    query: `
      query {
        transfers(orderBy: timestamp, orderDirection: desc, first: 10, where: { to: " }) {
          from
          to
          value
          timestamp
        }
      }
    `
  });
  return response.data.data.transfers;
};