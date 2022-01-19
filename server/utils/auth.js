const { AuthenticationError } = require("apollo-server-express");
const { TokenKind } = require("graphql");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
require("dotenv").config();

const jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;
const expiration = "1h";

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.headers.authorization;
    if (req.headers.authorization) {
      token = token; //.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, jwtSecretKey, {
        maxAge: expiration,
      });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req.user;
  },
  authMiddleware2: function (context) {
    const header = context.req.headers.authorization;
    if(header) {
      const token = header.split("Bearer ")[1]
      if (token) {
        try {
          const user = jwt.verify(token, jwtSecretKey);
          return user.data;
        } catch (error) {
          throw new AuthenticationError("Invalid token");
        }
      }
      throw new Error("Auth token required")
    }
    throw new Error("Authorization header must be provided");
  },
  signToken: function ({ name, email, _id }) {
    const payload = { name, email, _id };

    return jwt.sign({ data: payload }, jwtSecretKey, {
      expiresIn: expiration,
    });
  },
};
