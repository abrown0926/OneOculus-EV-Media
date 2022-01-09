const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Define which fields are accessible from the Class model
  type Class {
    _id: ID
    name: String
    building: String
    creditHours: Int
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
  }
  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
  }
  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    classes: [Class]
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }
`;

module.exports = typeDefs;
