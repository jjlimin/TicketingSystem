import React from 'react'
import { useEffect, useState } from 'react';
import { getEvent, exportAttendees} from "../../services/api.js";
import CopyButton from '../../components/CopyButton.jsx';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const mainLink="https://ticketing-system-ten.vercel.app";

  useEffect(() => {
    getEvent().then(res => setEvents(res.data));
  }, [])

  const handleExport = async (eventId, title) => {
    const res = await exportAttendees(eventId);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}_attendees.xlsx`);
    document.body.appendChild(link);
    link.click();

  }
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className='flex items-center justify-between mb-4'>
        <h2 className="text-2xl font-bold mb-4">Events Dashboard</h2>
        <button onClick={() => navigate("/admin/create")} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add New Event</button>
      </div>
      
      {events.map(ev => (
        <div key={ev._id} className="bg-white p-4 mb-3 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{ev.title}</h3>
            <p>{new Date(ev.date).toLocaleString()}</p>
            <p>{ev.attendeesCount} attendees</p>
          </div>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => handleExport(ev._id, ev.title)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Export
            </button>
            <CopyButton text={mainLink + ev.registrationLink}/>
          </div>
        </div>
          
      ))}
    </div>
  )
}

export default Dashboard