import React from "react";
import { Col, Row } from "react-bootstrap";
import products from "../products";
import Product from "../Components/Product";

const HomeScreen = () => {
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
