// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/94122/usdc-transfer-tracker/version/latest',  // Your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
