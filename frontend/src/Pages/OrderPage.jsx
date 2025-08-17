import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import MultiStepComponent from "../Components/MultiStepComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../utils";
import Message from "../Components/Message";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/orderSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";
import ButtonLoader from "../Components/ButtonLoader";

const OrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const address = getAddress(cart.shippingAddress);
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap({});
      dispatch(clearCartItems());
      navigate(`/order/${res.newOrder._id}`);
    } catch (error) {
      toast.error(error?.data?.Message);
    }
  };
  return (
    <>
      <MultiStepComponent step1={true} step2={true} step3={true} step4={true} />
      <Row className="mt-1">
        <Col md={8}>
          <h1>Order Details</h1>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Shipping: </strong>
              <span>{address}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Payment: </strong>
              <span>{cart.paymentMethod}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="mb-2">
                <strong>Ordered Items</strong>
              </div>
              {cart?.cartItems?.length === 0 ? (
                <Message variant="danger">
                  Choose items to proceed <Link to="/">Go Back</Link>
                </Message>
              ) : (
                <>
                  {cart.cartItems.map((item) => (
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
              <h1>Order Price</h1>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items: </Col>
                    <Col>{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping: </Col>
                    <Col>{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax: </Col>
                    <Col>{cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total: </Col>
                    <Col>
                      <strong>{cart.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroupItem>
                  {isError && (
                    <Message variant="danger">Error Placing Order</Message>
                  )}
                  <Button className="my-2" onClick={placeOrderHandler}>
                    {isLoading ? <ButtonLoader /> : "Place Order"}
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
