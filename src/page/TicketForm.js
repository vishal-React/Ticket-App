// src/pages/TicketForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db, auth, storage } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().required("Priority is required"),
  category: yup.string().required("Category is required"),
  attachment: yup.mixed().required("Attachment is required"),
  contactEmail: yup
    .string()
    .email("Invalid email")
    .required("Contact email is required"),
  phone: yup.string().required("Phone is required"),
  dueDate: yup.date().required("Due date is required"),
  issueType: yup.string().required("Issue type is required"),
  additionalInfo: yup.string(),
  location: yup.string().required("Location is required"),
  tags: yup.string().required("At least one tag is required"),
  termsAccepted: yup.boolean().oneOf([true], "You must accept the terms"),
});

const TicketForm = ({ onCompleted }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Handle file upload for the attachment
      if (data.attachment && data.attachment[0]) {
        const attachmentFile = data.attachment[0];
        const storageRef = ref(
          storage,
          `attachments/${Date.now()}_${attachmentFile.name}`
        );

        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, attachmentFile);

        // Get the file download URL
        const fileUrl = await getDownloadURL(storageRef);

        // Save the file URL in the data
        data.attachmentUrl = fileUrl;
      }

      // Remove the raw attachment field
      delete data.attachment;

      // Append current user email as "createdBy"
      data.createdBy = auth.currentUser.email;
      data.status = "open"; // default status

      // Save the ticket to Firestore
      await addDoc(collection(db, "tickets"), data);

      alert("Ticket submitted successfully!");
      reset();
      if (onCompleted) onCompleted();
    } catch (error) {
      console.error("Error submitting ticket: ", error);
      alert("Failed to submit ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ticket-form">
      <h2>Create New Ticket</h2>

      <div>
        <input {...register("title")} placeholder="Title" />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <textarea {...register("description")} placeholder="Description" />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>Priority: </label>
        <select {...register("priority")}>
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && <p>{errors.priority.message}</p>}
      </div>

      <div>
        <input {...register("category")} placeholder="Category" />
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <div className="file-input">
        <label>Attachment: </label>
        <input type="file" {...register("attachment")} />
        {errors.attachment && <p>{errors.attachment.message}</p>}
      </div>

      <div>
        <input {...register("contactEmail")} placeholder="Contact Email" />
        {errors.contactEmail && <p>{errors.contactEmail.message}</p>}
      </div>

      <div>
        <input {...register("phone")} placeholder="Phone" />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <div>
        <label>Due Date: </label>
        <input type="date" {...register("dueDate")} />
        {errors.dueDate && <p>{errors.dueDate.message}</p>}
      </div>

      <div>
        <label>Issue Type: </label>
        <input type="radio" value="bug" {...register("issueType")} /> Bug
        <input
          type="radio"
          value="feature"
          {...register("issueType")}
          style={{ marginLeft: "1rem" }}
        />{" "}
        Feature
        {errors.issueType && <p>{errors.issueType.message}</p>}
      </div>

      <div>
        <textarea
          {...register("additionalInfo")}
          placeholder="Additional Info (optional)"
        />
      </div>

      <div>
        <input {...register("location")} placeholder="Location" />
        {errors.location && <p>{errors.location.message}</p>}
      </div>

      <div>
        <input {...register("tags")} placeholder="Tags (comma separated)" />
        {errors.tags && <p>{errors.tags.message}</p>}
      </div>

      <div className="terms">
        <label>
          <input type="checkbox" {...register("termsAccepted")} />
          Accept terms and conditions
        </label>
        {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}
      </div>

      <button type="submit">Submit Ticket</button>
    </form>
  );
};

export default TicketForm;
