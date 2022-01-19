import React, { useContext, useEffect } from "react";
// import { decodeToken } from "../../utils/auth"
import { useQuery } from "@apollo/client";
import { GET_USER_POSTS, GET_USER_DETAILS } from "../../graphql/queries";
import { Grid,  Card, Icon } from "semantic-ui-react";
import PostCard from "../../components/postcard/PostCard";
import { AuthContext } from "../../utils/auth";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { data, refetch } = useQuery(GET_USER_POSTS);
  const userQuery = useQuery(GET_USER_DETAILS, {
    variables: {
      userId: user?._id,
    },
  });
  const userDetails = userQuery.data?.getUser;
  const posts = data?.getPostsByUser || [];

  useEffect(() => {
    refetch()
  }, [])
  return (
    <div>
      <h1>Dashboard</h1>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Card
              image={userDetails?.profilePicture}
              header={userDetails?.name}
              meta={userDetails?.email}
              description={userDetails?.desc}
              extra={
                <a>
                  <Icon name="user" />
                  {userDetails?.followers.length} Followers
                </a>
              }
            />
          </Grid.Column>
          <Grid.Column>
            {posts.length ? <PostCard {...posts[posts.length - 1]} refetch={refetch} /> : null}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            {posts.map((post) => (
              <PostCard {...post} key={post._id}  refetch={refetch}/>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
