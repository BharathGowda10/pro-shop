import {
  useGetOrderByIdQuery,
  useGetPaypalClienIdQuery,
  useUpdateIsPaidMutation,
} from "../slices/orderSlice";
import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Card,
  // Button,
} from "react-bootstrap";
import { formatDateTime, getAddress } from "../utils/index";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const { id: orderId } = useParams();

  const {
    data: orderItems,
    refetch,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId);
  const [updateIsPaid, { isLoading: payLoading }] = useUpdateIsPaidMutation();
  const {
    data: payPalId,
    isLoading: payPalLoading,
    isError: payPalError,
  } = useGetPaypalClienIdQuery();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  useEffect(() => {
    if (!payPalError && !payPalLoading && payPalId.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": payPalId.clientId,
            currency: "INR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (orderItems && !orderItems.order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [orderItems, payPalError, payPalId, payPalLoading, paypalDispatch]);

  // async function onApproveTest() {
  //   await updateIsPaid({ orderId, details: { payer: {} } });
  //   refetch();
  //   toast.success("Order is paid");
  // }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await updateIsPaid({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: orderItems.order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Message variant="danger">Error fetching order details</Message>;
  }
  return (
    <>
      <h1>OrderId: {orderItems?.order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping: </h3>
              <div>
                <strong>User: </strong> {orderItems?.order?.user?.name}
              </div>
              <div>
                <strong>Email: </strong> {orderItems?.order?.user?.email}
              </div>
              <div>
                <strong>Address: </strong>{" "}
                {getAddress(orderItems?.order?.shippingAddress)}
              </div>
              {orderItems?.order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {orderItems?.order?.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroupItem>
              <h3>Payment: </h3>
              <p>
                <strong>Method: </strong> {orderItems?.order?.paymentMethod}
              </p>
              {orderItems?.order?.isPaid ? (
                <Message variant="success">
                  Paid on {formatDateTime(orderItems?.order?.paidAt)}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>
            <ListGroup.Item>
              <div className="mb-2">
                <strong>Ordered Items</strong>
              </div>
              {orderItems?.order?.orderItems === 0 ? (
                <Message variant="danger">
                  No Order was found <Link to="/">Go Back</Link>
                </Message>
              ) : (
                <>
                  {orderItems?.order?.orderItems.map((item) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={1}>
                          <Image
                            alt={item.name}
                            src={item.image}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {`${item.qty} x ${item.price} = ${
                            item.qty * item.price
                          }`}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h1>Order Summary</h1>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items: </Col>
                    <Col>₹{orderItems?.order?.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping: </Col>
                    <Col>₹{orderItems?.order?.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax: </Col>
                    <Col>₹{orderItems?.order?.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total: </Col>
                    <Col>
                      <strong>₹{orderItems?.order?.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!orderItems?.order?.isPaid && (
                  <ListGroup.Item>
                    {payLoading && <Loader />}
                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        {/* <Button className="my-2" onClick={onApproveTest}>
                          Test Pay Order
                        </Button> */}
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderSummary;
