import { useState } from "react";
import FormContainer from "../Components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userSlice";
import { toast } from "react-toastify";
import ButtonLoader from "../Components/ButtonLoader";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    login({ email, password })
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        navigate("/");
        dispatch(setUserCredentials(data.user));
      })
      .catch((err) => toast.error(err?.data?.message));
  };

  return (
    <FormContainer>
      <Form onSubmit={loginHandler}>
        <h1>Login</h1>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="my-2 px-4 fw-bold" type="submit">
          {isLoading ? <ButtonLoader /> : "Login"}
        </Button>
      </Form>
      <Row>
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
