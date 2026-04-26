import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './app/page'; 
import AuthPage from './app/AuthPage'; // নিশ্চিত করুন ফাইলটি src/app/AuthPage.tsx এই নামেই আছে
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* ল্যান্ডিং পেজ থেকে /login?package=Free এভাবে কল করলে এটি কাজ করবে */}
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;