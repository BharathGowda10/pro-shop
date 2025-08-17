import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import ButtonLoader from "../Components/ButtonLoader";
import { useUpdateUserProfileMutation } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useGetMyOrdersQuery } from "../slices/orderSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { formatDateTime } from "../utils";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetMyOrdersQuery();
  const dispatch = useDispatch();

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserProfile({ name, email, password }).unwrap();
      dispatch(setUserCredentials(res.user));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <Row>
      <Col md={3}>
        <Form onSubmit={handleRegisterUser}>
          <h1>Profile Details</h1>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name.."
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className="my-2 px-4 fw-bold" type="submit">
            {isLoading ? <ButtonLoader /> : "Update"}
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message variant="danger">Error fetching Orders</Message>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.order.length === 0 ? (
                <Message variant="info">No Orders Found</Message>
              ) : (
                orders.order.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{formatDateTime(order.createdAt)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <Button
                        as={Link}
                        variant="info"
                        className="btn-sm"
                        to={`/order/${order._id}`}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
