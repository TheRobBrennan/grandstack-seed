import React from 'react';

// Components
import Login from './components/login/Login';

// Routing
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Apollo and GraphQL imports
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from "apollo-link";
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

// Apollo and GraphQL constants
const GRAPHQL_URI = 'http://localhost:8000/graphql';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || GRAPHQL_URI
});

const authMiddleware = new ApolloLink((operation, forward: any) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null
    }
  });

  return forward(operation);
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" children={<Login />} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
