import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // আপনার App.tsx কে ইমপোর্ট করুন
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* এখানে আলাদা করে Route দেওয়ার দরকার নেই, সব App.tsx থেকে আসবে */}
    <App />
  </React.StrictMode>,
)