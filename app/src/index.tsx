import React from 'react';
import ReactDOM from 'react-dom';

// App component
import App from './App';

// Apollo and GraphQL imports
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

// Apollo and GraphQL constants
const GRAPHQL_URI = 'http://localhost:8000/';
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: GRAPHQL_URI,
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);