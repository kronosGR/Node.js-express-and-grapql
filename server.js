const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const path = require('path');

// load the schemas and resolvers
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

// create the schema
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const app = express();

// connect graphQl with express with middleware and listens to /graphql endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, // enables graphiQl interface on /graphql
}));

app.listen(3000, () => {
  console.log('Running GraphQL server');
});