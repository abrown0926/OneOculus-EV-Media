import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const FormExampleInverted = () => (
  <Segment inverted>
    <Form inverted>
      <Form.Group widths="equal">
        <Form.Input fluid label="User Name" placeholder="User Name" />
        <Form.Input fluid label="Password" placeholder="Password" />
      </Form.Group>
      <Form.Checkbox label="I agree to the Terms and Conditions" />
      <Button type="submit">Login</Button>
    </Form>
  </Segment>
);
export default FormExampleInverted;
