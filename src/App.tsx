import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী সঠিক পাথ (Path)
import LandingPage from './app/(landing)/page'; 
import AuthPage from './app/AuthPage'; 
import Dashboard from './app/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* ল্যান্ডিং পেজ */}
        <Route path="/" element={<LandingPage />} />
        
        {/* অথ পেজ (লগইন/রেজিস্ট্রেশন) */}
        <Route path="/login" element={<AuthPage />} />
        
        {/* আপনি চাইলে ড্যাশবোর্ডও এখানে অ্যাড করতে পারেন */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;