const { AuthenticationError } = require("apollo-server-express");
const { Post, User } = require("../models");
const auth = require("../utils/auth");

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost() {
      try {
        const posts = await Post.findOne();
        return Post.findOne({ _id: postId });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async register(_, { email, name, hashed_password }) {
      try {
        const foundUser = await User.findOne({ email });
        if (foundUser) throw new AuthenticationError("Email already exist");
        const user = await User.create({
          email,
          name,
          password: hashed_password,
        });
        const token = auth.signToken(user);
        return user;
      } catch (error) {
        throw error;
      }
    },
    async login(_, { email, hashed_password }) {
      try {
        const existingUser = await User.findOne({ email });
        if (!existingUser)
          throw new AuthenticationError("Email does not exist");
        const passwordMatch = await User.checkPassword(
          existingUser.salt,
          hashed_password
        );
        if (passwordMatch !== existingUser.hashed_password)
          throw new AuthenticationError("Incorrect password");
        const token = auth.signToken(existingUser);
        console.log(token);
        return existingUser;
      } catch (error) {
        throw error;
      }
    },
    async createPost(_, { text, email, userId }, context) {
      try {
        const currentUser = auth.authMiddleware(context);
        if (!currentUser) throw new AuthenticationError("login required");
        const newPost = await Post.create({ text, email, userId });console.log(newPost, "psotcreted")
        return newPost;
      } catch (error) {
        throw error;
      }
    },
    addComment: async (_, { postId, commentText, postedBy }) => {
      return await Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: { comments: { commentText, postedBy } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    deletePost: async (_, { postId }) => {
      const returnedValue = await Post.findOneAndDelete({ _id: postId });
      return returnedValue
    },
    removeComment: async (_, { postId, commentId }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
