import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "../Pages/ProductPage";
import HomeScreen from "../Pages/HomeScreen";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path="/cart" element={<App />} /> */}
        {/* <Route path="/login" element={<App />} /> */}
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
};

export default Routing;
