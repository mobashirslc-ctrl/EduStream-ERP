import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// পাথগুলো ঠিক করা হয়েছে (src যোগ করা হয়েছে)
import LandingPage from './app/(landing)/page'
import LoginPage from './app/(auth)/login/page'
import DashboardLayout from './app/(dashboard)/layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <div className="p-10">
              <h1 className="text-2xl font-bold">Dashboard content loaded!</h1>
            </div>
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)