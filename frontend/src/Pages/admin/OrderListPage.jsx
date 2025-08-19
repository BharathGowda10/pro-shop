import { Button, Col, Row, Table } from "react-bootstrap";
import { useGetAllOrdersQuery } from "../../slices/orderSlice";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { formatDateTime } from "../../utils";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderListPage = () => {
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery();
  return (
    <Row>
      <h1>Orders</h1>
      <Col>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">Error fetching Orders</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
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
                    <Button className="btn-sm" as={Link} to={`/order/${order._id}`} variant="info">
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default OrderListPage;
