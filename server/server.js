const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./schemas");
const { MONGODB } = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(async () => {
  console.log(`API server running on port ${PORT}!`);
  const res = await app.listen({ port: 3001 });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
