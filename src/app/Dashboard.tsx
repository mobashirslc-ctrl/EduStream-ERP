import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, FolderOpen, Bell, LogOut, 
  Plus, Lock, Globe, Zap, Database, ShieldCheck, 
  BarChart3, Users, MessageSquare, Clock 
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>("");

  const brandColor = "#e11d48"; 

  const allFeatures = [
    { id: 'tracking', name: 'Real-time Tracking', icon: Zap, minPackage: 'Basic' },
    { id: 'doc_management', name: 'Document Hub', icon: FolderOpen, minPackage: 'Basic' },
    { id: 'notifications', name: 'Smart Alerts', icon: Bell, minPackage: 'Basic' },
    { id: 'applications', name: 'My Applications', icon: FileText, minPackage: 'Standard' },
    { id: 'global_reach', name: 'Global Network', icon: Globe, minPackage: 'Standard' },
    { id: 'analytics', name: 'Business Insights', icon: BarChart3, minPackage: 'Standard' },
    { id: 'support', name: 'Priority Support', icon: MessageSquare, minPackage: 'Standard' },
    { id: 'security', name: 'Secure Processing', icon: ShieldCheck, minPackage: 'Professional' },
    { id: 'database', name: 'Cloud Storage', icon: Database, minPackage: 'Professional' },
    { id: 'team', name: 'Multi-user Access', icon: Users, minPackage: 'Professional' },
  ];

  useEffect(() => {
    const checkAccess = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          
          if (data.status === 'trial') {
            const startTime = new Date(data.createdAt).getTime();
            const currentTime = new Date().getTime();
            const twoHoursInMs = 2 * 60 * 60 * 1000;
            const expiryTime = startTime + twoHoursInMs;

            if (currentTime > expiryTime) {
              await updateDoc(userRef, { status: 'blocked' });
              alert("Your Free Trial has expired!");
              auth.signOut();
              return;
            } else {
              const remaining = expiryTime - currentTime;
              const mins = Math.floor(remaining / 60000);
              setTimeLeft(`${mins} mins`);
            }
          } else if (data.status === 'blocked') {
            alert("Account Blocked. Contact Admin.");
            auth.signOut();
            return;
          }
          setUserData(data);
        }
      }
      setLoading(false);
    };

    const timer = setInterval(checkAccess, 60000);
    checkAccess();
    return () => clearInterval(timer);
  }, []);

  const isFeatureLocked = (minPackage: string) => {
    if (userData?.status === 'trial') return false;
    const packages = ['Basic', 'Standard', 'Professional'];
    const userPkg = userData?.package || 'Basic';
    return packages.indexOf(userPkg) < packages.indexOf(minPackage);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold">Checking Access...</div>;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar - এটি ল্যান্ডিং পেজের মতো সাদা ও ক্লিন */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-8">
          <h1 className="text-xl font-extrabold tracking-tight">
            IHP <span style={{ color: brandColor }}>PORTAL</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {allFeatures.slice(0, 5).map((f) => (
            <div key={f.id} className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-xl cursor-pointer transition-all">
              <div className="flex items-center gap-3">
                <f.icon className="h-4 w-4" /> {f.name}
              </div>
              {isFeatureLocked(f.minPackage) && <Lock className="h-3 w-3 opacity-40" />}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button onClick={() => auth.signOut()} className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 transition-all font-bold text-sm">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Hello, {userData?.companyName || 'Partner'}! 👋</h2>
            {userData?.status === 'trial' ? (
              <div className="flex items-center gap-2 text-amber-700 font-bold bg-amber-100 px-4 py-1.5 rounded-full mt-3 text-xs w-fit border border-amber-200">
                <Clock className="h-4 w-4 animate-pulse" /> FREE TRIAL ENDS IN: {timeLeft}
              </div>
            ) : (
              <p className="text-gray-500 mt-1">Status: <span className="text-emerald-600 font-bold uppercase">{userData?.package} Plan</span></p>
            )}
          </div>
          <button style={{ backgroundColor: brandColor }} className="text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-rose-200 hover:scale-105 transition-all flex items-center gap-2 text-sm">
            <Plus className="h-5 w-5" /> New Application
          </button>
        </header>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {allFeatures.map((feature) => {
            const locked = isFeatureLocked(feature.minPackage);
            return (
              <div key={feature.id} className={`relative p-6 rounded-3xl border transition-all ${locked ? 'bg-gray-50 opacity-40 grayscale' : 'bg-white shadow-sm border-white hover:shadow-xl hover:-translate-y-1'}`}>
                {locked && <Lock className="absolute top-4 right-4 h-4 w-4 text-gray-400" />}
                <div style={{ color: locked ? '#9ca3af' : brandColor }} className="mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className={`font-bold text-sm ${locked ? 'text-gray-500' : 'text-gray-800'}`}>{feature.name}</h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold tracking-wider">
                   {locked ? `Requires ${feature.minPackage}` : 'Access Granted'}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;