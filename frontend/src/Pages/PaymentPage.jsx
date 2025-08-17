import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPaymentMethod } from "../slices/cartSlice";
import MultiStepComponent from "../Components/MultiStepComponent";

const PayementPage = () => {
  const { paymentMethod } = useSelector((state) => state.cart);
  const [paymentName, setPaymentName] = useState(paymentMethod || "PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentName));
    navigate("/order");
  };
  return (
    <>
      <MultiStepComponent step1={true} step2={true} step3={true} />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Check
              type="radio"
              label={paymentName}
              defaultChecked
              name="payment-method"
              value={paymentName}
              className="fs-5"
              onChange={(e) => setPaymentName(e.target.value)}
            ></Form.Check>
          </Form.Group>
          <Button className="my-2" type="submit">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PayementPage;
