import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MultiStepComponent = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="d-flex justify-content-center fs-6">
      <Nav>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
        {step1 ? (
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/cart" disabled>
            Cart
          </Nav.Link>
        )}
        {step2 ? (
          <Nav.Link as={Link} to="/shipping">
            Address
          </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/shipping" disabled>
            Address
          </Nav.Link>
        )}
        {step3 ? (
          <Nav.Link as={Link} to="/payment">
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/payment" disabled>
            Payment
          </Nav.Link>
        )}
        {step4 ? (
          <Nav.Link as={Link} to="/order">
            Order
          </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/order" disabled>
            Order
          </Nav.Link>
        )}
      </Nav>
    </div>
  );
};

export default MultiStepComponent;
