import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product";
import { useGetProductsQuery } from "../slices/productSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Message variant="danger">Error Fetching Products List</Message>;
  }

  return (
    <>
      <Row>
        {products.map((prod) => (
          <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={prod} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
