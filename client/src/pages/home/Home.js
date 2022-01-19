import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { GET_POSTS } from "../../graphql/queries";
import { AuthContext } from "../../utils/auth";
import PostCard from "../../components/postcard/PostCard";
import PostForm from "../../components/postform/PostForm";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data, refetch } = useQuery(GET_POSTS);
  const posts = data?.getPosts || [];

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post._id} style={{ margin: 20 }}>
                  <PostCard {...post} refetch={refetch} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
