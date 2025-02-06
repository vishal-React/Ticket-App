// src/pages/TicketDashboard.js
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../Firebase";
import { Link } from "react-router-dom";
import "./main.css";

const TicketDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const role = localStorage.getItem("role"); // "customer" or "agent"
  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    let q;
    if (role === "customer") {
      q = query(collection(db, "tickets"), where("createdBy", "==", userEmail));
    } else {
      q = query(collection(db, "tickets"));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ticketsArr = [];
      querySnapshot.forEach((doc) => {
        ticketsArr.push({ id: doc.id, ...doc.data() });
      });
      setTickets(ticketsArr);
    });

    return () => unsubscribe();
  }, [role, userEmail]);

  const handleDelete = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await deleteDoc(doc(db, "tickets", ticketId));
        alert("Ticket deleted successfully!");
      } catch (error) {
        console.error("Error deleting ticket: ", error);
      }
    }
  };

  return (
    <div className="ticket-dashboard">
      <h2>Ticket Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{ticket.createdBy}</td>
              <td>{ticket.assignedTo || "N/A"}</td>
              <td className="ticket-actions">
                <Link to={`/edit-ticket/${ticket.id}`}>Edit</Link>
                <Link to={`/view-ticket/${ticket.id}`}>View</Link>
                {role === "customer" && (
                  <div className="delBtn">
                    <button onClick={() => handleDelete(ticket.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketDashboard;
