const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const schema = buildSchema(`
  type Query {
    products: [Product]
    orders: [Order]
  }
  
  type Product {
    id: ID!
    description: String!
    reviews:[Review]
    price: Float!
  }
  
  type Review {
    rating: Int!
    comment: String
  }
  
  type Order{
    date: String!
    subtotal: Float!
    items: [OrderItem]
  }
  
  
  type OrderItem {
    product: Product!
    quantity: Int!
  }
`);

const root = {
  products: [
    {
      id: 'redshoe',
      description: 'Red Shoe',
      price: 42.12,
    },
    {
      id: 'bluejean',
      description: 'Blue Jeans',
      price: 55.555,
    },
  ],
  orders: [
    {
      date: '2005-05-05',
      subtotal: 90.22,
      item: [
        {
          product: {
            id: 'redshoe',
            description: 'Old red Shore',
            price: 45.11,
          },
          quantity: 2,
        },
      ],
    },
  ],
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