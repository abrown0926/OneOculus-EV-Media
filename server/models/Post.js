const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
  // _id: {
  //   type: ,
  //   required: "Id required",
  // },
  email: {
    type: String,
    // required: "Email is required",
  },
  text: {
    type: String,
    required: "Text is required",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
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
      postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
