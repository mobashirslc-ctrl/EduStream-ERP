import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// পাথগুলো ডট (.) দিয়ে শুরু করছি এবং একদম ফোল্ডার অনুযায়ী লিখছি
import LandingPage from './app/(landing)/page'
import LoginPage from './app/(auth)/login/page'
import DashboardLayout from './app/(dashboard)/layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* হোম পেজ */}
        <Route path="/" element={<LandingPage />} />
        
        {/* লগইন পেজ */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* ড্যাশবোর্ড */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <div className="p-6">
              <h2 className="text-xl font-bold">Welcome to Dashboard</h2>
            </div>
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)