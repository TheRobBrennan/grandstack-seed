import React from 'react';

// Apollo and GraphQL imports
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

// Apollo and GraphQL constants
const GRAPHQL_URI = 'http://localhost:8000/graphql';
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: GRAPHQL_URI,
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div>[DEMO] GRANDstack | create-react-app</div>
    </ApolloProvider>
  );
}

export default App;
