import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './app/page'; // আপনার ল্যান্ডিং পেজের পাথ
import AuthPage from './app/AuthPage'; // আপনার নতুন অথ পেজের পাথ
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* ল্যান্ডিং পেজ রুট */}
        <Route path="/" element={<LandingPage />} />
        
        {/* লগইন/রেজিস্ট্রেশন পেজ রুট */}
        <Route path="/login" element={<AuthPage />} />
        
        {/* ভবিষ্যতে ড্যাশবোর্ড যোগ করলে এখানে রুট দিবেন */}
      </Routes>
    </Router>
  );
}

export default App;