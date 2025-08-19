import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUserCredentials } from "../slices/authSlice";
import Loader from "../Components/Loader";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { cartItems } = useSelector((state) => state.cart);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully");
        dispatch(setUserCredentials(null));
        navigate("/login");
      })
      .catch((err) => toast.error(err?.data?.message));
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="proshop logo" />
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse aria-controls="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                <span>
                  <Badge pill bg="success" className="ms-1">
                    {cartItems?.reduce((acc, val) => acc + val.qty, 0) || 0}
                  </Badge>
                </span>
              </Nav.Link>
              <>
                {userInfo ? (
                  <NavDropdown title={userInfo?.name} className="fs-6 fw-bold">
                    <NavDropdown.Item as={Link} to="/profile">
                      <FaUser /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link as={Link} to="/login">
                    <FaUser /> Login
                  </Nav.Link>
                )}
                {userInfo?.isAdmin && (
                  <NavDropdown title="Admin" className="fs-6 fw-bold">
                    <NavDropdown.Item as={Link} to="/admin/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/products">
                      Products
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/users">
                      Users
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
