import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { makeAugmentedSchema } from "neo4j-graphql-js";

import { DEFAULT_JWT_SECRET } from './config/constants'
import { driver } from './config/neo4j'
import { injectUser } from './middleware/inject-user'
import { typeDefs } from "./graphql-schema";
import { resolvers } from "./resolvers";

// Graph our environment variables from our .env file and create a variable for our JWT secret
dotenv.config();
export const SECRET = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;

// Create express app
export const app = express();

// Add Middleware to our Express server
app.use(cors());
app.use(injectUser);

// Create a schema out of our typedefs and resolvers
// Alter query and mutation flags for auto generation by neo4j-graphql-js
const schema = makeAugmentedSchema({
  typeDefs,
  resolvers,
  config: {
    // Set to true if you want neo4j-graphql-js to automatically generate queries based on your schema
    query: false,
    // Set to true if you want neo4j-graphql-js to automatically generate mutations based on your schema
    mutation: false
  }
});

// Create a new apollo server and pass in the Neo4j Driver, JWT Secret, and User object into the server as Context
const server = new ApolloServer({
  context: ({ req }) => ({ driver, SECRET, user: req.user || null }),
  schema
});

// Applying middleware to the newly created Apollo Server and specify a queriable path (also where Graphiql will display in browser)
server.applyMiddleware({ app, path: "/graphql" });

// Open up a port and start the server on it
app.listen({ port: process.env.GRAPHQL_LISTEN_PORT || 8000 }, () => {
  console.log(
    `🚀 Server live at ${process.env.GRAPHQL_URI || "http://localhost:8000"} 🚀`
  );
});
