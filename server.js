const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const path = require('path');

// load the schemas
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));

// create the schema
const schema = makeExecutableSchema({
  typeDefs: [typesArray],
});

// sample data
const root = {
  products: require('./products/products.model'),
  orders: require('./orders/orders.model'),

};

const app = express();

// connect graphQl with express with middleware and listens to /graphql endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // enables graphiQl interface on /graphql
}));

app.listen(3000, () => {
  console.log('Running GraphQL server');
});