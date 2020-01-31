# GRANDstack seed

This project was originally inspired and cloned off existing work from [@erikrahm](https://github.com/erikrahm) in the repo [https://github.com/erikrahm/grand-stack-seed](https://github.com/erikrahm/grand-stack-seed)

GRANDStack (GraphQL, React, Apollo, Neo4j Database) seed project with built in Local Auth and Facebook OAuth, and sample User GQL types/queries/mutations.

## Seed project set-up

 1. Create `.env` file in your `./server` directory with the following env variables:

    `NEO4J_URI= *example: bolt://localhost:8687*` (this can be a local instance of neo4j or a neo4j sandbox URI)

    `NEO4J_USER= *example: neo4j*`

    `NEO4J_PASSWORD= *example: password*`

 2. Create a JWT encryption key using a service such as https://mkjwk.org/ this will be used for encryption in your username/password auth strategy. Once you have the key add it your your `./server`'s `.env` file like so:

    `JWT_SECRET= *example: generated secret*`

 3. Install dependencies in the root and for both the server and client by running `npm (or yarn) install` in the root directory, followed by `npm (or yarn) run install-all` in the root directory.
 4. Start up both servers by running `npm start` in the root of the project`
 5. Start dev-ing!

## Project configuration

### Enable Facebook OAuth

Facebook OAuth by default is disabled, to allow for user's of this seed project without interest in OAuth to forego it all together. If you would like to enable it all you have to do is create a new app at https://developers.facebook.com and then add the app credentials to the `.env` file in the `./server` directory.

    FB_ID= * Get this from https://developers.facebook.com*

    FB_SECRET= *Get this from https://developers.facebook.com*

If you plan to run this project locally (on localhost) then make sure to edit the Facebook App's settings and add `localhost` to the App Domains field and add `http://localhost:8000/` as the Site Url in the Website list at the bottom of the settings.

### Server configuration

 1. There is a schema.graphql file that contains all of tha app's type definitions and is run through a schema generator that converts Cypher queries (indicated by the `@cypher` or `@relationship` directives) into valid computed properties.
 2. You can turn on automatic mutation generation on `line 44` of the `server/src/index.js` file and mutation on  `line 45` (this will generate queries for all of your defined types, and add/update/delete mutations for all of your types as well) though I personally reccomend writing your own resolvers or computed properties using the directives mentioned above as it will give you more fine grained control over your application.
 3. There is Local already built in to the application, you can see this in action in the `server/src/resolvers.js` file. Facebook OAuth is also built in and can be seen in the `server/src/index.js` file!
 4. You can create even more complex queries and mutations by leverage in the `neo4jgraphql` method that is exposed by `neo4j-graphql-js` package by mutating data passed in to a query/mutation before it hits your neo4j database, you can see this in `server/src/resolvers.js` on `lines 8-12` where passwords are being hashed and salted by `bcrypt`

### Client configuration

 1. This is just a basic Create React App (with typescript) that can be configured to your heart's content. (If you're unfamiliar with how to do this there are many resources available online.
 2. The app is wrapped in an `ApolloProvider` making your GraphQL server queriable throughout the app. (This happens in `client/src/components/App.tsx`
 3. The app is also wrapped in a `BrowserRouter` from `react-router` and you can define your routes as you see fit.
	 - There is an authenticated route at `/` that can only be accessed once a user is logged in.
	 - There is a `/register` route that has some default styled form fields that handle user registration and a `/login` route to authenticate a user.
