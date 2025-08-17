import React, { useState } from "react";
import FormContainer from "../Components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShippingAddress } from "../slices/cartSlice";
import MultiStepComponent from "../Components/MultiStepComponent";

const ShippingPage = () => {
  const oldAddress = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {};
  const [shippingAddress, setShippingAddress] = useState(
    oldAddress.shippingAddress || {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (shippingAddress.address) {
      dispatch(addShippingAddress(shippingAddress));
      navigate("/payment");
    }
  };
  return (
    <>
      <MultiStepComponent step1={true} step2={true} />
      <FormContainer>
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={shippingAddress.address}
              placeholder="Enter Shipping address..."
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={shippingAddress.city}
              placeholder="Enter city name"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  city: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              value={shippingAddress.postalCode}
              placeholder="Enter postal code"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postalCode: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              value={shippingAddress.country}
              placeholder="Enter country name"
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
            />
          </Form.Group>
          <Button className="my-2 px-4" type="submit">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingPage;
