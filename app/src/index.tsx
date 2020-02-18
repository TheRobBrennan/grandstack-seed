import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const GRAPHQL_URI = 'http://localhost:8000/'
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: GRAPHQL_URI,
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});