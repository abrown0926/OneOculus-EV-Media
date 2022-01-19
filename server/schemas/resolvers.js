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
    async getPost(_, { postId }) {
      try {
        const post = await Post.findOne({ _id: postId }).populate({path: "postedBy"})
        return post
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPostsByUser(_, args, context) {
      try {
        const currentUser = auth.authMiddleware2(context);
        const posts = await Post.find({ postedBy: currentUser._id });
        return posts;
      } catch (error) {
        throw error;
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw err;
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
        return {...user._doc, token};
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
        return { ...existingUser._doc, token };
      } catch (error) {
        throw error;
      }
    },
    async updateUser(_, { userInput, userId }) {
      // const {email, desc, name} = userInput
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          ...userInput,
        },
        { new: true }
      );
      return updatedUser;
    },
    async createPost(_, { text, title }, context) {
      try {
        const currentUser = auth.authMiddleware2(context);
        if (!currentUser) throw new AuthenticationError("login required");
        const newPost = await Post.create({
          text,
          title,
          postedBy: currentUser._id,
        })
        return newPost;
      } catch (error) {
        throw error;
      }
    },
    addComment: async (_, { postId, commentText, commentBy }) => {
      return await Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: { comments: { commentText, commentBy } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    updatePost: async (_, { postId, title, text }) => {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { text, title },
        { new: true }
      );
      return updatedPost;
    },
    deletePost: async (_, { postId }) => {
      const returnedValue = await Post.findOneAndDelete({ _id: postId });
      return returnedValue;
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
