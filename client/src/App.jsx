import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEvent from './pages/Admin/CreateEvent';
import RegisterPage from './pages/Register/RegisterPage';
import ScannerPage from './pages/Scan/ScannerPage';
import Dashboard from './pages/Admin/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/create" element={<CreateEvent/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/register/:eventId" element={<RegisterPage/>}/>
        <Route path="/scan/:eventId" element={<ScannerPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
