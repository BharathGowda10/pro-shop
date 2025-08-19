import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div>{userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" />}</div>
  );
};

export default AdminRoute;
