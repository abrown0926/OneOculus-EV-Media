import gql from "graphql-tag"

export const LOGIN_MUTATION = gql`
  mutation loginUser($email: String!, $hashed_password: String!) {
    login(email: $email, hashed_password: $hashed_password) {
      _id
      name
      email
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation registerUser(
    $email: String!
    $hashed_password: String!
    $name: String!
  ) {
    register(email: $email, name: $name, hashed_password: $hashed_password) {
      _id
      name
      email
      token
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addNewComment($postId: ID!, $commentText: String!, $commentBy: ID!) {
    addComment(
      commentText: $commentText
      postId: $postId
      commentBy: $commentBy
    ) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;