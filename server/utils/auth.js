const { TokenKind } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;
const expiration = "1h";

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
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

    return req;
  },
  signToken: function ({ name, email, _id }) {
    const payload = { name, email, _id };

    return jwt.sign({ data: payload }, jwtSecretKey, {
      expiresIn: expiration,
    });
  },
};
