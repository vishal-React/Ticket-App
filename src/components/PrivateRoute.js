// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../Firebase";

const PrivateRoute = ({ children }) => {
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
