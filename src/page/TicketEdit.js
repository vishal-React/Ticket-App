// src/pages/TicketEdit.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// A simplified validation schema for editing
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().required("Priority is required"),
});

const TicketEdit = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchTicket = async () => {
      const docRef = doc(db, "tickets", ticketId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("priority", data.priority);
      } else {
        alert("Ticket not found");
        navigate("/dashboard");
      }
      setLoading(false);
    };
    fetchTicket();
  }, [ticketId, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, data);
      alert("Ticket updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating ticket: ", error);
      alert("Error updating ticket");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="ticket-edit-container">
      <h1 className="ticket-edit-header">Edit Ticket</h1>
      <form className="ticket-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("title")} placeholder="Title" />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <textarea {...register("description")} placeholder="Description" />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <select {...register("priority")}>
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p>{errors.priority.message}</p>}
        </div>
        <button type="submit">Update Ticket</button>
      </form>
    </div>
  );
};

export default TicketEdit;
