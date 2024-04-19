import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return user?.token === undefined ? (
    <Navigate to="/login" replace />
  ) : (
    children
  );
};

export default PrivateRoute;
