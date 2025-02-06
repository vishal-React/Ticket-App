import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../Firebase";

const PrivateRoute = ({ children }) => {
  const role = localStorage.getItem("role"); // Check role in localStorage
  const user = auth.currentUser; // Check Firebase authentication

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
