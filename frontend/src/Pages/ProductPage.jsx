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
} from "react-bootstrap";
import { useGetProductDetailsQuery } from "../slices/productSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const ProductPage = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);

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
                <Button
                  className="btn btn-block"
                  disabled={product.countInStock === 0}
                  type="button"
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
