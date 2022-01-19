import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_SINGLE_POST } from "../../graphql/queries";
import { Button, Comment, Form, Header, Card } from "semantic-ui-react";
import { useCommentForm } from "../../utils/hooks";
import { AuthContext } from "../../utils/auth";

const SinglePost = () => {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const postId = useParams("id");
  const { handleSubmit } = useCommentForm(user, {
    commentText,
    commentBy: user?._id,
    postId: postId.id,
  });
  const { data, loading, error, refetch } = useQuery(GET_SINGLE_POST, {
    variables: {
      postId: postId.id,
    },
  });
  const post = data?.getPost;

  function addComment() {
      handleSubmit(refetch)
      setCommentText("")
  }

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return (
      <>
        <h1>Post not found</h1>
      </>
    );
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <Card
        image="/images/avatar/large/elliot.jpg"
        header={post.title}
        meta={post.createdAt}
        description={post.text}
      />
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>

        {post?.comments.map((item) => (
          <Comment key={item._id}>
            <Comment.Avatar
              src={
                item.commentBy.profilePicture
                  ? item.commentBy.profilePicture
                  : "https://react.semantic-ui.com/images/avatar/large/molly.png"
              }
            />
            <Comment.Content>
              <Comment.Author as="a">{item.commentBy._id}</Comment.Author>
              <Comment.Metadata>
                <div>{item.createdAt}</div>
              </Comment.Metadata>
              <Comment.Text>{item.commentText}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}

        <Form reply>
          <Form.TextArea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
            onClick={addComment}
          />
        </Form>
      </Comment.Group>
    </div>
  );
};

export default SinglePost;
