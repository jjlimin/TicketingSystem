import React, { useState } from "react";
import QrReader from "react-qr-reader-es6";
import { scanTicket } from "../../services/api.js";

function ScannerPage() {
  const [lastResult, setLastResult] = useState("");
  const [message, setMessage] = useState("Point your camera at a QR code...");

  const handleScan = async (qrValue) => {
    if (!qrValue) return;
    if (qrValue === lastResult) return;

    setLastResult(qrValue);
    console.log("Scanned value:", qrValue);

    try {
      const res = await scanTicket(qrValue);
      setMessage(res.data.message);
      alert(res.data.message);
    } catch (error) {
      console.error("Scan error:", error.response?.data || error);
      setMessage("Invalid or unregistered ticket");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h1 className="text-xl font-bold mb-4">Ticket Scanner</h1>
      <div className="w-80 border-2 border-gray-300 rounded-xl overflow-hidden bg-black">
        <QrReader
          constraints={{ facingMode: "environment" }}
          scanDelay={500}
          onScan={(data, error) => {
            if (data) handleScan(data);
            if (error) console.debug("QR error:", error);
          }}
          style={{ width: "100%" }}
        />
      </div>
      <p className="mt-4 text-gray-700 text-center">{message}</p>
    </div>
  );
}

export default ScannerPage;
