const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    },
  ],
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
