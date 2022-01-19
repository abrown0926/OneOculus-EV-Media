const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Define which fields are accessible from the Class model
  type Post {
    _id: ID!
    text: String!
    title: String!
    postedBy: User
    createdAt: String!
    comments: [Comment]!
  }
  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    commentBy: User!
  }
  type User {
    _id: ID!
    name: String
    email: String!
    hashed_password: String!
    ev: String
    desc: String!
    currentCity: String
    createdAt: String
    profilePicture: String
    coverPicture: String
    token: String
    followers: [User]
    following: [User]
  }

  input UserInput {
    name: String!
    email: String!
    ev: String
    profilePicture: String
    coverPicture: String
    desc: String
    currentCity: String
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post
    getPostsByUser: [Post]
    name: String
    email: [User]
    getUser(userId: ID!): User
    posts(postedBy: String): [Post]
    post(postId: ID!): Post
    comments(commentBy: String): User
    me: User
  }

  type Mutation {
    register(email: String!, hashed_password: String!, name: String!): User!
    login(email: String!, hashed_password: String!): User!
    updateUser(userInput: UserInput, userId: ID!): User
    createPost(
      text: String!
      title: String!
    ): Post
    updatePost(postId: ID!, text: String!, title: String!): Post
    deletePost(postId: ID!): Post
    addComment(postId: ID!, commentText: String!, commentBy: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
