import { useState, useEffect } from 'react';
import { 
  FileText, FolderOpen, Bell, LogOut, Plus, Lock, Globe, Zap, 
  Database, ShieldCheck, BarChart3, Users, MessageSquare, Clock, Camera 
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>("");

  const brandColor = "#10b981"; // ল্যান্ডিং পেজের এমেরাল্ড গ্রিন

  // ল্যান্ডিং পেজের ১০টি মূল ফিচার
  const allFeatures = [
    { id: 'ai_assessment', name: 'AI Assessment Hub', icon: Zap, minPackage: 'Basic' },
    { id: 'cloudinary', name: 'Cloudinary Manager', icon: Camera, minPackage: 'Basic' },
    { id: 'tracking', name: '20-Step Tracking', icon: BarChart3, minPackage: 'Basic' },
    { id: 'mail_alerts', name: 'Auto Mail Alerts', icon: Bell, minPackage: 'Standard' },
    { id: 'invoicing', name: 'Smart Invoicing', icon: FileText, minPackage: 'Standard' },
    { id: 'compliance', name: 'Staff & Compliance', icon: Users, minPackage: 'Standard' },
    { id: 'marketing', name: 'Marketing Studio', icon: Globe, minPackage: 'Professional' },
    { id: 'qr_tracking', name: 'QR Student Tracking', icon: Database, minPackage: 'Professional' },
    { id: 'ticketing', name: 'Integrated Ticketing', icon: ShieldCheck, minPackage: 'Professional' },
    { id: 'support', name: 'Priority Support', icon: MessageSquare, minPackage: 'Professional' },
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
            const expiryTime = startTime + (2 * 60 * 60 * 1000);
            if (currentTime > expiryTime) {
              await updateDoc(userRef, { status: 'blocked' });
              auth.signOut();
              return;
            } else {
              const remaining = expiryTime - currentTime;
              setTimeLeft(`${Math.floor(remaining / 60000)} mins`);
            }
          }
          setUserData(data);
        }
      }
      setLoading(false);
    };
    checkAccess();
    const timer = setInterval(checkAccess, 60000);
    return () => clearInterval(timer);
  }, []);

  const isFeatureLocked = (minPackage: string) => {
    if (userData?.status === 'trial') return false; // ট্রায়ালে সব আনলক
    const packages = ['Basic', 'Standard', 'Professional'];
    const userPkg = userData?.package || 'Basic';
    return packages.indexOf(userPkg) < packages.indexOf(minPackage);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-500">Loading Portal...</div>;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Fixed Width and Perfect Alignment */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col shadow-sm">
        <div className="p-8">
          <div className="flex items-center gap-3">
             <div style={{ backgroundColor: brandColor }} className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black">HP</div>
             <h1 className="text-xl font-black tracking-tighter">PARTNER <span style={{ color: brandColor }}>PORTAL</span></h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 overflow-y-auto space-y-1">
          {allFeatures.map((f) => (
            <div key={f.id} className="flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl cursor-pointer transition-all">
              <div className="flex items-center gap-3">
                <f.icon className="h-4 w-4" /> {f.name}
              </div>
              {isFeatureLocked(f.minPackage) && <Lock className="h-3 w-3 opacity-30" />}
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <button onClick={() => auth.signOut()} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 transition-all font-bold text-sm">
            <LogOut className="h-4 w-4" /> Logout Account
          </button>
        </div>
      </aside>

      {/* Main Content - Smooth Scrolling and Perfect Sizing */}
      <main className="flex-1 overflow-y-auto p-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome, {userData?.companyName || 'Partner'}! 👋</h2>
            {userData?.status === 'trial' ? (
              <div className="inline-flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-4 py-2 rounded-full mt-4 text-xs border border-emerald-100">
                <Clock className="h-4 w-4" /> TRIAL ENDS IN: {timeLeft}
              </div>
            ) : (
              <p className="text-slate-400 mt-2 font-medium uppercase tracking-widest text-[11px]">Active Plan: <span style={{ color: brandColor }} className="font-black">{userData?.package}</span></p>
            )}
          </div>
          <button style={{ backgroundColor: brandColor }} className="text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:shadow-emerald-200 hover:-translate-y-1 transition-all flex items-center gap-2">
            <Plus className="h-5 w-5" /> Submit Application
          </button>
        </header>

        {/* Feature Grid - Full List with Locking Logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {allFeatures.map((feature) => {
            const locked = isFeatureLocked(feature.minPackage);
            return (
              <div key={feature.id} className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-300 ${locked ? 'bg-slate-50 border-slate-100' : 'bg-white border-white shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50'}`}>
                {locked && (
                  <div className="absolute top-6 right-6 bg-slate-200 p-2 rounded-full">
                    <Lock className="h-3 w-3 text-slate-500" />
                  </div>
                )}
                <div style={{ color: locked ? '#cbd5e1' : brandColor }} className={`mb-6 p-4 rounded-3xl w-fit transition-transform group-hover:scale-110 ${locked ? 'bg-slate-100' : 'bg-emerald-50'}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className={`font-black text-base leading-tight mb-2 ${locked ? 'text-slate-400' : 'text-slate-900'}`}>{feature.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                   {locked ? `Requires ${feature.minPackage}` : 'Feature Active'}
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