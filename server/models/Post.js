const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const User = require("./User");

const { Schema } = mongoose;

const postSchema = new Schema({
  postText: {
    type: String,
    minlength: 1,
    maxlength: 1000,
    trim: true,
  },
  postAuthor: {
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
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
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
//   users: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
