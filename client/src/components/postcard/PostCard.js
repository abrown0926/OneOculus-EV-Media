import React, { useContext, useState } from "react";
import { Button, Card, Icon, Label, Image, Modal, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useCommentForm } from "../../utils/hooks";
import { AuthContext } from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../graphql/mutation";

function PostCard({
  text,
  _id,
  title,
  createdAt,
  postedBy,
  comments,
  refetch,
}) {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [modalToggle, setModalToggle] = useState(false);

  const [deletePostMutation] = useMutation(DELETE_POST, {
    variables: { postId: _id },
  });

  const { handleSubmit } = useCommentForm(user, {
    commentText,
    commentBy: user?._id,
    postId: _id,
  });

  function openModal() {
    if (user) {
      setModalToggle(true);
    } else {
      alert("Log in required");
    }
  }

  function commentOnPost() {
    handleSubmit(refetch);
    setModalToggle(false);
  }
  return (
    <>
      <Card fluid>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{postedBy?.name}</Card.Header>
          <Card.Meta as={Link} to={`/post/${_id}`}>
            {createdAt}
          </Card.Meta>
          <Card.Meta>{title}</Card.Meta>
          <Card.Description>{text}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as="div" labelPosition="right">
            <Button color="teal" basic>
              <Icon name="heart" />
              Like
            </Button>
            <Label basic color="teal" pointing="left"></Label>
          </Button>
          <Button as="div" labelPosition="right">
            <Modal
              trigger={
                <Button color="blue" basic onClick={() => openModal()}>
                  <Icon name="comments" />
                  {comments?.length} Comments
                </Button>
              }
              header="Add Comment"
              content={
                <>
                  <Form reply>
                    <Form.TextArea
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Button
                      content="Add Comment"
                      labelPosition="left"
                      icon="edit"
                      primary
                      onClick={commentOnPost}
                    />
                    <Button
                      content="Cancel"
                      labelPosition="left"
                      icon="delete"
                      negative
                      onClick={() => setModalToggle(false)}
                    />
                  </Form>
                </>
              }
              open={modalToggle}
            />
            <Label basic color="blue" pointing="left">
              {/* {commentCount} */}
            </Label>
          </Button>
          {user && user?._id === postedBy?._id && (
            <Button
              as="div"
              color="red"
              floated="right"
              onClick={() => {
                deletePostMutation();
                refetch();
              }}
            >
              <Icon name="trash" style={{ margin: 0 }} />
            </Button>
          )}
        </Card.Content>
      </Card>
    </>
  );
}

export default PostCard;
