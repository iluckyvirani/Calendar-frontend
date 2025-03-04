import React, { useState } from "react";
import axios from "axios";

const AddEvent = ({ onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add", {
        title,
        date, // Fix: Send 'date' instead of 'start'
        time: "12:00", // Example: Hardcoded, or add a new time input field
        description: "Default Description", // Example: Can be empty or another field
        reminder: false // Example: Default false, or add a checkbox for user input
      });

      onEventAdded();
      setTitle("");
      setDate("");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="p-5">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 text-white p-2">Add</button>
    </form>

  );
};

export default AddEvent;
