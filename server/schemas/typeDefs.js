const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Define which fields are accessible from the Class model
  type Post {
    _id: ID!
    text: String!
    createdAt: String!
    name: String!
    email: String!
  }
  type User {
    _id: ID!
    name: String!
    email: String!
    hashed_password: String!
    about: String
    createdAt: String
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    getPosts: [Post]
    name: String
    email: [User]
    user(email: String!): User
    posts(name: String): [Post]
    post(postId: ID!): Post
    comments(name: String): User
    me: User
  }
  type Mutation {
    register(email: String!, hashed_password: String!, name: String!): User!
    login(email: String!, hashed_password: String!): User!
    createPost(text: String!): Post
  }
`;

module.exports = typeDefs;
