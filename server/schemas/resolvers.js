const { AuthenticationError } = require("apollo-server-express");
const { Post, User } = require("../models");
const auth = require("../utils/auth");

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    // posts: async () => {
    //   return await Post.find({});
    // },
    // post: async (parent, { postId }) => {
    //   return Post.findOne({ _id: postId });
    // },
    // users: async () => {
    //   return User.find().populate("posts");
    // },
    // user: async (parent, { username }) => {
    //   return User.findOne({ username }).populate("posts");
    // },
    // posts: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Post.find(params).sort({ createdAt: -1 });
    // },
    // post: async (parent, { postId }) => {
    //   return Post.findOne({ _id: postId });
    // },
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findOne({ _id: context.user._id }).populate("posts");
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
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
        console.log(token)
        return existingUser;
      } catch (error) {
        throw error;
      }
    },
    async createPost(_, {text}, context) {
      try {
        const currentUser = auth.authMiddleware(context)
        if(!currentUser) throw new AuthenticationError("login required");
        const newPost = Post.create({text, postedBy: currentUser._id})
        return newPost;
      } catch (error) {
        throw error
      }
    }
  },
};

module.exports = resolvers;
