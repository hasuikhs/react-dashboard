import { buildSchema, GraphQLSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

const testSchema: GraphQLSchema = buildSchema(`
  type Query {
    hello: String
  }
`);

const testRoot = {
  hello: () => {
    return 'Hello World';
  }
};

const testGraphql = graphqlHTTP({
  schema: testSchema,
  rootValue: testRoot,
  graphiql: true
});

export default testGraphql;