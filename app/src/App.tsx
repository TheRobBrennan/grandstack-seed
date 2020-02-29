import React from 'react';

// Components
import Placeholder from './components/placeholder/Placeholder';
import Login from './components/login/Login';
import Register from './components/register/Register';

// Routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Apollo and GraphQL imports
import { ApolloClient } from 'apollo-client';
import { concat } from "apollo-link";
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { GRAPHQL_URI } from './config/constants';
import { authMiddleware } from './middleware/auth-middleware';

// Apollo and GraphQL constants
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || GRAPHQL_URI
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
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
