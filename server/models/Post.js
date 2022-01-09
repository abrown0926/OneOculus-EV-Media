const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema({
  body: {
    type: String,
    minlength: 1,
    maxlength: 1000,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      body: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  likes: [
    {
      username: {
        type: String,
        createdAt: String,
      },
    },
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const Post = model("Post", postSchema);

module.exports = Post;
