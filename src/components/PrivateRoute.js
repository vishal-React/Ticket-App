import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const role = localStorage.getItem("role"); // Check localStorage role

  if (loading) {
    return <p>Loading...</p>; // Prevents flickering before auth state is resolved
  }

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
