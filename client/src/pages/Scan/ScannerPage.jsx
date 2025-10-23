import { useState } from "react";
import { QrReader } from "react-qr-reader-es6";
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
            } catch (error) {
                setMessage("Invalid");
            }
        }
    }
  return (
    <div className="flex felx-col items-center mt-10">
        <h1 className="text-xl font-bold mb-4">Ticket Scanner</h1>
        <div className="w-80 border rounded-xl overflow-hidden">
            <QrReader
                constraints={{facingMode: "enviroment"}}
                onResult={(data, error) => {
                    if (data) handleScan(data);
                    if (error) console.info(error);
                }}
            />
            <p className="mt-4 text-gray-700">{message}</p>
        </div>
    </div>
  )
}

export default ScannerPage