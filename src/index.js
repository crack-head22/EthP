import React from 'react';
import ReactDOM from 'react-dom/client';  // Make sure you're importing from 'react-dom/client'
import './index.css';
import { ApolloProvider } from '@apollo/client';
import App from './App.js';
import client from './apolloClient.js'; // Import Apollo Client

// Create a root for concurrent rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App wrapped with ApolloProvider to manage Apollo Client state
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
