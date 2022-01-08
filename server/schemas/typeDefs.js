const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    _id: ID!
    body: String!
    username: String!
  }

  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post
  }
`;

module.exports = typeDefs;
