import React from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../../utils/hooks";
import { GET_POSTS } from "../../graphql/queries";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: " ",
    text: " ",
  });

  const [createNewPost, { error }] = useMutation(CREATE_NEW_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_POSTS,
      });
      let newPostData = [...data.getPosts];
      newPostData = [result.data.createPost, ...newPostData];
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
          ...data,
          getPosts: {
            newPostData,
          },
        },
      });
      values.title = " ";
      values.text = " ";
    },
  });

  function createPostCallback() {
    createNewPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Title"
            label="Title"
            name="title"
            onChange={onChange}
            value={values.title}
            error={error ? true : false}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            placeholder="OneOculus"
            name="text"
            label="Text"
            onChange={onChange}
            value={values.text}
            error={error ? true : false}
          />
        </Form.Field>
        <Button type="submit" color="blue">
          Submit
        </Button>
      </Form>
      {error && (
        <div className="ui error messsage" style={{ marginBottom: 20 }}>
          <ul className="list">
            {/* <li>{error.graphQLErrors[0].message}</li> */}
            <li>Error</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_NEW_POST = gql`
  mutation createNewPost($title: String!, $text: String!) {
    createPost(title: $title, text: $text) {
      _id
      text
      createdAt
      title
      postedBy {
        _id
      }
      comments {
        _id
      }
    }
  }
`;

export default PostForm;
