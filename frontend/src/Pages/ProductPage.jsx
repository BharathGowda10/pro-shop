import { Link, useParams } from "react-router-dom";
import Rating from "../Components/Rating";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useGetProductDetailsQuery } from "../slices/productSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { useState } from "react";

const ProductPage = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Message variant="danger">Error Fetching Products Details</Message>;
  }
  return (
    <>
      <Link to="/">
        <Button className="btn btn-primary my-3">Go Back</Button>
      </Link>
      <Row>
        <Col md={5}>
          <Image
            src={product.image}
            alt="product Image"
            className="rounded"
            fluid
          />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Price: </strong>
                  </Col>
                  <Col>
                    <strong> {product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Status: </strong>
                  </Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Quantity: </strong>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="/cart">
                  <Button
                    className="btn btn-block"
                    disabled={product.countInStock === 0}
                    type="button"
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
