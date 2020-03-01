import React from 'react';

// Components
import AuthRoute   from './components/auth-route/auth-route';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Register from './components/register/Register';

// Routing
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Apollo and GraphQL imports
import { ApolloClient } from 'apollo-client';
import { concat } from "apollo-link";
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { GRAPHQL_URI } from './graphql/apollo/apollo';

// Middleware
import { authMiddleware } from './middleware/auth-middleware';

// Apollo and GraphQL constants
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || GRAPHQL_URI
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
          <AuthRoute exact path="/" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
