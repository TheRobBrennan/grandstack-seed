import React from 'react';

// Components
import Placeholder from './components/placeholder/Placeholder';

// Routing
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Placeholder} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
