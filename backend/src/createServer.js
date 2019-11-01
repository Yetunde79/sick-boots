const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

//Create the graphql yoga server

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOption: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
