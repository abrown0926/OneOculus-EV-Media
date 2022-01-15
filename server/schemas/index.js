// const typeDefs = require("./typeDefs");
// const resolvers = require("./resolvers");
// const { Post, User } = require("../models");

// module.exports = {
//   Query: {
//     ...postResolvers.Query,
//   },
//   Mutation: {
//     ...User.Mutation,
//   },
// };

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

module.exports = { typeDefs, resolvers };
