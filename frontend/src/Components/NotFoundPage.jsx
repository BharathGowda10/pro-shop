import React from "react";
import FormContainer from "./FormContainer";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <FormContainer>
      <Card className="d-flex justify-content-center align-items-center py-5">
        <Card.Body className="fs-4">Oops 👀 Not found....!</Card.Body>
        <Button as={Link} to="/" className="my-2 w-50">
          Go To Home
        </Button>
      </Card>
    </FormContainer>
  );
};

export default NotFoundPage;
