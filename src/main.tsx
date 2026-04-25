import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// ইমপোর্ট করার সময় এক্সটেনশনসহ এবং সঠিক কেস (Case) ব্যবহার করুন
import LandingPage from './app/(landing)/page.tsx'
import LoginPage from './app/(auth)/login/page.tsx'
import DashboardLayout from './app/(dashboard)/layout.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <div className="p-10 text-center">
              <h1 className="text-3xl font-bold">EduStream AI ERP Live!</h1>
            </div>
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)