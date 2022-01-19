import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_COMMENT } from "../graphql/mutation";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export const useCommentForm = (user, data = {}) => {
  const [addComment] = useMutation(ADD_COMMENT, {
    variables: {
      commentText: data.commentText,
      postId: data.postId,
      commentBy: data.commentBy,
    },
  });

  async function handleSubmit(refetchFunction) {
      if (!user) {
          alert("login required")
          return
      }
      await addComment()
      refetchFunction()
  }

  return {handleSubmit}
};
