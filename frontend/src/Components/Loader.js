import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ width: "3rem", height: "3rem" }}
      className="d-block mx-auto mt-5"
    />
  );
};

export default Loader;
