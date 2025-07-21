import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Navbar from './components/Navbar'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'

import AdminDashboard from './components/Admin/AdminDashboard'
import Sidebar from './components/Sidebar'
import UserDashboard from './components/User/UserDashboard'

import { SnackbarProvider } from 'notistack'
import AddUsers from './components/Admin/AddUsers'
function App() {
  

  return (
    <>
    {/* <Navbar /> */}
      
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      {/* <Route path="/admin/adduser" element={<AddUsers />} /> */}
      {/* Add more routes as needed */}
    <Route path="/admin/adduser" element={<AddUsers/>} />
    </Routes>
    
  
    
    </>
  )
}

export default App
