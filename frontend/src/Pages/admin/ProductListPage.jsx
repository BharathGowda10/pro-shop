import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../slices/productSlice";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import ButtonLoader from "../../Components/ButtonLoader";
import { toast } from "react-toastify";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";

const ProductListPage = () => {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();
  const editHandler = (id) => {
    console.log("edit " + id);
  };
  const deleteHandler = (id) => {
    console.log("delete " + id);
  };
  const createProductHandler = async () => {
    try {
      await createProduct();
      refetch();
      toast.success("Product Created Successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Products List</h2>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm" onClick={createProductHandler}>
            {createLoading ? (
              <ButtonLoader />
            ) : (
              <span>
                <FaPlus /> Create a new Product
              </span>
            )}
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message>Error fetching Products</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm mt-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{<FaEdit onClick={() => editHandler(product._id)} />}</td>
                <td>
                  {<FaTrash onClick={() => deleteHandler(product._id)} />}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListPage;
