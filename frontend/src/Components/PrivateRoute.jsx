import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return <div>{userInfo ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default PrivateRoute;
