const mongoose = require("mongoose");
const crypto = require("crypto");
const dateFormat = require("../utils/dateFormat");

// const { Schema, model } = require("mongoose");
//const Post = require("./Post");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
      max: 50,
    },
    hashed_password: {
      type: String,
      required: "Password is required",
      min: 6,
    },
    salt: String,
    updated: Date,
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    about: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    // console.log(password);
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.path("hashed_password").validate(function (v) {
  // console.log(this._password, "this._password");
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required!");
  }
}, null);

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

userSchema.statics.checkPassword = async function (salt, password) {
  const hashedPassword = function (salt, password) {
    const hmac = crypto.createHmac("sha1", salt);
    return hmac.update(password).digest("hex");
  };

  return hashedPassword(salt, password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
