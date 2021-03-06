// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useMutation } from "@apollo/react-hooks";
// import { Button, Icon, Label } from "semantic-ui-react";
// import gql from "graphql-tag";

// function LikeButton({ user, post: { _id, likeCount, likes } }) {
//   const [liked, setLiked] = useState(false);
//   useEffect(() => {
//     if (user && likes.find((like) => like.email === user.email)) {
//       setLiked(true);
//     } else setLiked(false);
//   }, [user, likes]);

//   const [likePost] = useMutation(LIKE_POST_MUTATION, {
//     variables: { postId: _id },
//   });

//   const likeButton = user ? (
//     liked ? (
//       <Button color="teal">
//         <Icon name="heart" />
//       </Button>
//     ) : (
//       <Button color="teal" basic>
//         <Icon name="heart" />
//       </Button>
//     )
//   ) : (
//     <Button as={Link} to="/login" color="teal" basic>
//       <Icon name="heart" />
//     </Button>
//   );
//   return (
//     <Button as="div" labelPosition="right" onClick={likePost}>
//       {likeButton}
//       <Label basic color="teal" pointing="left">
//         {likeCount}
//       </Label>
//     </Button>
//   );
// }

// const LIKE_POST_MUTATION = gql`
//   mutation likePost($postId: ID!) {
//     likePost(PostId: $postId) {
//       _id
//       likes {
//         _id
//         email
//       }
//       likeCount
//     }
//   }
// `;
// export default LikeButton;
