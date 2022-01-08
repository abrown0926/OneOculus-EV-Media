const { Post } = require("../models/Post");

const resolvers = {
  Query: {
    getPosts: async () => {
      return Post.find();
    },
    getPost: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
  },
};

module.exports = resolvers;
