// import { gql } from "@apollo/client";
import gql from "graphql-tag";

export const GET_POSTS = gql`
  query getAllPosts {
    getPosts {
      _id
      text
      title
      createdAt
      postedBy {
        _id
        name
      }
      comments {
        _id
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query getUserPosts {
    getPostsByUser {
      _id
      text
      title
      createdAt
      postedBy {
        _id
      }
      comments {
        _id
      }
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query getUserDetails($userId: ID!) {
    getUser(userId: $userId) {
      _id
      email
      name
      profilePicture
      coverPicture
      ev
      createdAt
      currentCity
      followers {
        _id
      }
      following {
        _id
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query getSpecificPost($postId: ID!) {
    getPost(postId: $postId) {
      _id
      text
      title
      createdAt
      postedBy {
        _id
        profilePicture
        name
        email
      }
      comments {
        _id
        commentText
        commentBy {
          _id
          name
          profilePicture
        }
        createdAt
      }
    }
  }
`;
