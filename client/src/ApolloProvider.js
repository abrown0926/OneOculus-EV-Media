import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { HttpLink } from "@apollo/client";

import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const link = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwt_token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

// const link = new HttpLink({
//   uri: "http://localhost:3001/graphql",
//   // Additional options
// });

// const client = new ApolloClient({
//   request: (operation) => {
//     const authToken = localStorage.getItem("jwt_token");
//     operation.setContext({
//       headers: {
//         authorization: authToken ? authToken : "",
//       },
//     });
//   },
//   uri: "/graphql",
//   cache: new InMemoryCache(),
// });

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
