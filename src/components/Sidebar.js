// src/components/Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li>
          <Link to="/dashboard" className="sidebar-link">
            {localStorage.getItem("role") === "customer" ? "Customer" : "Admin"}
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
