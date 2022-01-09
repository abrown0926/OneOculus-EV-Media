const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    minlength: 8,
  },
  createdAt: {
    type: String,
  },
});

const User = model("User", userSchema);

module.exports = User;
