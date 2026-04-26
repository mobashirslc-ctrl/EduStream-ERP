import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Send, Bell, Settings, LogOut, 
  Clock, CheckCircle2, AlertCircle, Search, User, Building2 
} from 'lucide-react';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const brandColor = "#e11d48";

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        navigate('/auth');
      }
      setLoading(false);
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e11d48]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white text-xs">IHP</div>
            Partner Portal
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-rose-50 text-rose-600 rounded-xl font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
            <Send size={20} /> Submit New File
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
            <FileText size={20} /> My Applications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
            <Bell size={20} /> Notifications
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-rose-600 transition-all">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type="text" placeholder="Search by Student ID or Name..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-rose-500 text-sm" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">{userData?.authPersonName}</p>
              <p className="text-xs text-gray-500">{userData?.companyName}</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 space-y-8 overflow-y-auto">
          {/* Welcome Section */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome back, {userData?.companyName}! 👋</h2>
              <p className="text-gray-500 mt-1">Check your students' processing status in real-time.</p>
            </div>
            <button style={{backgroundColor: brandColor}} className="text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
              <Send size={18} /> Submit New Application
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Files', count: '0', icon: <FileText className="text-blue-600" />, bg: 'bg-blue-50' },
              { label: 'Processing', count: '0', icon: <Clock className="text-amber-600" />, bg: 'bg-amber-50' },
              { label: 'Approved', count: '0', icon: <CheckCircle2 className="text-emerald-600" />, bg: 'bg-emerald-50' },
              { label: 'Action Needed', count: '0', icon: <AlertCircle className="text-rose-600" />, bg: 'bg-rose-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className={`${stat.bg} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.count}</p>
              </div>
            ))}
          </div>

          {/* Recent Applications Table (Placeholder) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Recent Applications</h3>
              <button className="text-rose-600 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <FileText size={32} />
              </div>
              <p className="text-gray-500">No applications found yet. Start by submitting your first student file!</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;