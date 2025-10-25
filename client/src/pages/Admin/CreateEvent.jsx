import React from 'react'
import { useState } from 'react';
import { createEvent } from '../../services/api';
import CopyButton from '../../components/CopyButton';

function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
  });

  const [link, setLink] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("working...");
    
    const res = await createEvent(form);
    setLink(`${window.location.origin}/register/${res.data._id}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="title" placeholder="Title" className="input" onChange={handleChange} />
        <input name="date" type="datetime-local" className="input" onChange={handleChange} />
        <input name="location" placeholder="Location" className="input" onChange={handleChange} />
        <input name="capacity" placeholder="Capacity" type="number" className="input" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="input" onChange={handleChange}></textarea>
        <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 mt-2">
          Create Event
        </button>
      </form>

      {link && (
        <div className="mt-4">
          <p className="font-semibold">Registration Link:</p>
          <a href={link} className="text-blue-500 underline">{link}</a>
          <CopyButton text={`${window.location.origin}${link}`}/>
        </div>
      )}
    </div>
  )
}

export default CreateEvent