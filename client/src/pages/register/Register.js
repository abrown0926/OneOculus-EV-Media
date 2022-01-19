import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../utils/auth";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErros] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    name: "",
    email: "",
    hashed_password: "",
    confirm_password: "",
  });

  const [addUser, { loading }] = useMutation(SIGNUP_MUTATION, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/dashboard");
    },
    onError(err) {
      console.log(err)
    },
    variables: values,
  });

  function registerUser() {
    if (values.hashed_password !== values.confirm_password) {
      alert("Password Does not match");
    } else {
      addUser();
    }
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Name"
          placeholder="Name..."
          name="name"
          type="text"
          value={values.name}
          error={errors.name ? true : false}
          onChange={onChange}
        />
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirm_password"
          type="password"
          value={values.confirmPassword}
          error={errors.hashed_password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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

const SIGNUP_MUTATION = gql`
  mutation registerUser(
    $email: String!
    $hashed_password: String!
    $name: String!
  ) {
    register(
      email: $email
      name: $name
      hashed_password: $hashed_password
    ) {
      _id
      name
      email
      createdAt
      token
    }
  }
`;

export default Register;
