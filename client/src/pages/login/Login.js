import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../utils/auth";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErros] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    hashed_password: "",
  });

  const [loginUser, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    variables: {
      ...values
    },
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/dashboard");
    },
    onError(err) {
      console.log(err)
    },
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="hashed_password"
          type="password"
          value={values.hashed_password}
          error={errors.hashed_password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_MUTATION = gql`
  mutation loginUser(
    $email: String!
    $hashed_password: String!
  ) {
    login(email: $email, hashed_password: $hashed_password) {
      _id
      name
      email
      createdAt
      token
    }
  }
`;

export default Login;
