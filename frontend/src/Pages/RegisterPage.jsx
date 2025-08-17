import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../Components/FormContainer";
import { useRegisterUserMutation } from "../slices/userSlice";
import ButtonLoader from "../Components/ButtonLoader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../slices/authSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterUser = (e) => {
    e.preventDefault();
    registerUser({ name, email, password })
      .unwrap({})
      .then((data) => {
        toast.success(data?.message);
        navigate("/");
        dispatch(setUserCredentials(data.user));
      })
      .catch((err) => toast.error(err?.data?.message));
  };
  return (
    <FormContainer>
      <Form onSubmit={handleRegisterUser}>
        <h1>Register</h1>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
          {isLoading ? <ButtonLoader /> : "Register"}
        </Button>
      </Form>
      <Row>
        <Col>
          Existing customer? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
