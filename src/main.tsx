import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// ইমপোর্ট করার সময় './app/...' এর বদলে সরাসরি সঠিক পাথ দিচ্ছি
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
            <div className="p-10 text-center">
              <h1 className="text-3xl font-bold text-teal-600">EduStream ERP Dashboard</h1>
              <p className="text-gray-500 mt-4">ড্যাশবোর্ডের কাজ সফলভাবে শুরু হয়েছে!</p>
            </div>
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)