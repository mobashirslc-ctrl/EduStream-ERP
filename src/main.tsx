import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// সঠিক ইমপোর্ট পাথ নিশ্চিত করছি
import LandingPage from './app/(landing)/page'
import LoginPage from './app/(auth)/login/page'
import DashboardLayout from './app/(dashboard)/layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ল্যান্ডিং পেজ */}
        <Route path="/" element={<LandingPage />} />
        
        {/* লগইন পেজ */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* ড্যাশবোর্ড লেআউট */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
            </div>
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)