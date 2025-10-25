import { useState } from "react";
import QrReader from "react-qr-reader-es6"; // {}
import {scanTicket} from "../../services/api.js";

import React from 'react'

function ScannerPage() {
    const [result, setResult] = useState("");
    const [message, setMessage] = useState("");

    const handleScan = async (data) => {
        if (data && data.text !== result) {
            setResult(data.text);
            try {
                const res = await scanTicket(data.text);
                setMessage(`${res.data.message}`);
                alert("success");
            } catch (error) {
                setMessage("Invalid");
                alert("invalid");
            }
        }
    }
  return (
    <div className="flex flex-col items-center mt-10">
        <h1 className="text-xl font-bold mb-4">Ticket Scanner</h1>
        <div className="w-80 border rounded-xl overflow-hidden">
            <QrReader
                constraints={{facingMode: {ideal: "environment"} }}
                scanDelay={300}
                onResult={(data, error) => {
                    if (data) handleScan(data);
                    if (error) console.info(error);
                }}
                style={{width: "100%"}}
            />
        </div>
        <p className="mt-4 text-gray-700">{message}</p>
    </div>
  )
}

export default ScannerPage