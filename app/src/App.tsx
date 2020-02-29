import React from 'react';

// Components
import Login from './components/login/Login';
import Placeholder from './components/placeholder/Placeholder';

// Routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

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

const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    const queryParams = new URLSearchParams(window.location.search);
    const altToken = queryParams.get("token");
    if (altToken) {
      localStorage.setItem("token", altToken);
      return true;
    }
    return false;
  }
};

const AuthRoute = ({ ...props }) => (
  <Route
    {...props}
    render={() =>
      checkAuth() ? <Placeholder /> : <Redirect to={{ pathname: "/login" }} />
    }
  />
);

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact path="/" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" render={() => {
            localStorage.removeItem("token");
            return <Redirect to={{ pathname: "/" }} />;
          }} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
