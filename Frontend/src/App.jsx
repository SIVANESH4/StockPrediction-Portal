import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import DashboardPage from './components/DashBoardPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthProvider from './components/AuthProvider'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
