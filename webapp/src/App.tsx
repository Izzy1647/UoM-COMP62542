import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Admin from './components/Admin/Admin'
import Dashboard from './components/Dashboard/Dashboard'
import SignIn from './components/SignIn/SignIn'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/dashboard/*" element={<Dashboard />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
