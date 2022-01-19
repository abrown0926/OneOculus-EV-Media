const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
  // _id: {
  //   type: ,
  //   required: "Id required",
  // },
  title: {
    type: String,
  },
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  profilePicture: {
    type: String,
    default: "",
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      commentText: {
        type: String,
        minlength: 1,
        maxlength: 1000,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      commentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
