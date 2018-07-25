import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import registerServiceWorker from './registerServiceWorker';
import App from './App';

import './style.css';

dotenv.config();

const GITHUB_BASE_URL = "https://api.github.com/graphql";

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if(graphQLErrors) {
    console.log('graphQLErrors:', graphQLErrors);
  }
  
  if(networkError) {
    console.log('networkError:', networkError);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();