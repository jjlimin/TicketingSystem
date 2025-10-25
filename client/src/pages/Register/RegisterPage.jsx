import React from 'react'
import {useParams} from "react-router-dom";
import {useState} from "react";
import {QRCodeCanvas} from "qrcode.react";

import { registerUser } from '../../services/api';

function RegisterPage() {
  const {eventId} = useParams();
  const [form, setForm] = useState({name: "", email: ""});
  const [ticket, setTicket] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(eventId, form);
    console.log("QR Code value from backend:", res.data.qrCode);
    setTicket(res.data.qrCode);
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Event Registration</h2>

      {!ticket ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name='name' placeholder='Fullname' className='input' onChange={handleChange} />
          <input name='email' placeholder='Email' className='input' onChange={handleChange} />
          <button type='submit' className="bg-blue-600 text-white rounded-lg py-2 mt-2">Get ticket!</button>
        </form>
      ) : (
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 font-semibold text-gray-700">Your Ticket QR Code</p>
          <QRCodeCanvas value={ticket} size={256} level="L"/>
          <p className="text-sm mt-3 text-gray-500">Save this QR for entry.</p>
        </div>
      )}
    </div>
  )
}

export default RegisterPage