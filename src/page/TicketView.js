import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

const TicketView = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const docRef = doc(db, "tickets", ticketId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Assuming `dueDate` is a Timestamp object
        const dueDate = data.dueDate
          ? data.dueDate.toDate().toLocaleString()
          : "No due date";
        setTicket({ ...data, dueDate });
      } else {
        alert("Ticket not found");
      }
    };
    fetchTicket();
  }, [ticketId]);

  if (!ticket) return <p>Loading ticket details...</p>;

  return (
    <div className="ticket-view-container">
      <h1 className="ticket-view-header">Ticket Details</h1>
      <div className="ticket-view-detail">
        <p>
          <strong>Title:</strong> {ticket.title}
        </p>
        <p>
          <strong>Description:</strong> {ticket.description}
        </p>
        <p>
          <strong>Priority:</strong> {ticket.priority}
        </p>
        <p>
          <strong>Status:</strong> {ticket.status}
        </p>
        <p>
          <strong>Created By:</strong> {ticket.createdBy}
        </p>
        <p>
          <strong>Assigned To:</strong> {ticket.assignedTo || "Not Assigned"}
        </p>
      </div>
      <p className="ticket-view-due-date">
        <strong>Due Date:</strong> {ticket.dueDate}
      </p>
    </div>
  );
};

export default TicketView;
