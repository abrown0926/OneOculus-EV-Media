const { Post } = require("../models");

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    getPosts: async () => {
      // Get and return all documents from the posts collection
      return await Post.find({});
    },
  },
};

module.exports = resolvers;
