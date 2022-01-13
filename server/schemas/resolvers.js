const { Class, Post, User } = require("../models");

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  // Query: {
  //   posts: async () => {
  //     return await Post.find({});
  //   },
  //   post: async (parent, { postId }) => {
  //     return Post.findOne({ _id: postId });
  //   },
  //   users: async () => {
  //     return User.find().populate("posts");
  //   },
  //   user: async (parent, { username }) => {
  //     return User.findOne({ username }).populate("posts");
  //   },
  //   posts: async (parent, { username }) => {
  //     const params = username ? { username } : {};
  //     return Post.find(params).sort({ createdAt: -1 });
  //   },
  //   post: async (parent, { postId }) => {
  //     return Post.findOne({ _id: postId });
  //   },
  //   me: async (parent, args, context) => {
  //     if (context.user) {
  //       return User.findOne({ _id: context.user._id }).populate("posts");
  //     }
  //     throw new AuthenticationError("You need to be logged in!");
  //   },
  // },
};

module.exports = resolvers;
