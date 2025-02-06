// src/pages/Dashboard.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TicketDashboard from "./TicketDashboard";
import TicketForm from "./TicketForm";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="dashboard-container">
      <Sidebar className="dashboard-sidebar" />
      <div className="dashboard-main">
        <h1 className="dashboard-header">Support Dashboard</h1>
        {/* Show TicketForm only for customers */}
        {localStorage.getItem("role") === "customer" && (
          <div className="dashboard-button-container">
            <button className="dashboard-button" onClick={toggleForm}>
              {showForm ? "Hide Ticket Form" : "Raise a Ticket"}
            </button>
            {showForm && <TicketForm onCompleted={toggleForm} />}
          </div>
        )}
        <div className="ticket-dashboard-container">
          <TicketDashboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
