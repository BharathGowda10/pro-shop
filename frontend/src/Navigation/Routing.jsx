import { Routes, Route } from "react-router-dom";
import ProductPage from "../Pages/ProductPage";
import HomeScreen from "../Pages/HomeScreen";
import CartPage from "../Pages/CartPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ShippingPage from "../Pages/ShippingPage";
import PaymentPage from "../Pages/PaymentPage";
import OrderPage from "../Pages/OrderPage";
import OrderSummary from "../Pages/OrderSummary";
import ProfilePage from "../Pages/ProfilePage";
import PrivateRoute from "../Components/PrivateRoute";
import AdminRoute from "../Components/AdminRoute";
import NotFoundPage from "../Components/NotFoundPage";
import OrderListPage from "../Pages/admin/OrderListPage";
import ProductListPage from "../Pages/admin/ProductListPage";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/:id" element={<OrderSummary />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orders" element={<OrderListPage />} />
          <Route path="/admin/products" element={<ProductListPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Routing;
