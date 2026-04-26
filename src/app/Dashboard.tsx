import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, FolderOpen, Bell, LogOut, 
  Plus, Lock, Globe, Zap, Database, ShieldCheck, 
  BarChart3, Users, MessageSquare, Clock, CreditCard, Camera
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>("");

  // Landing page emerald green theme colour
  const brandColor = "#10b981"; 

  // Landing page-er sob features dashboard-e
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
    if (userData?.status === 'trial') return false; // Trial-e sob unlock
    const packages = ['Basic', 'Standard', 'Professional'];
    const userPkg = userData?.package || 'Basic';
    return packages.indexOf(userPkg) < packages.indexOf(minPackage);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-600">Verifying Portal Access...</div>;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar - Matching Landing Theme */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col">
        <div className="p-8">
          <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
            <span style={{ backgroundColor: brandColor }} className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold">HP</span>
            PARTNER <span style={{ color: brandColor }}>PORTAL</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {allFeatures.slice(0, 5).map((f) => (
            <div key={f.id} className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl cursor-pointer transition-all">
              <div className="flex items-center gap-3">
                <f.icon className="h-4 w-4" /> {f.name}
              </div>
              {isFeatureLocked(f.minPackage) && <Lock className="h-3 w-3 opacity-30" />}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <button onClick={() => auth.signOut()} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 transition-all font-bold text-sm">
            <LogOut className="h-4 w-4" /> Logout Account
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Welcome, {userData?.companyName || 'Partner'}!</h2>
            {userData?.status === 'trial' ? (
              <div className="flex items-center gap-2 text-emerald-700 font-bold bg-emerald-100 px-4 py-2 rounded-full mt-4 text-xs w-fit border border-emerald-200 shadow-sm">
                <Clock className="h-4 w-4 animate-spin-slow" /> TRIAL ACCESS ENDS IN: {timeLeft}
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-slate-400 text-sm">Active Plan:</span>
                <span style={{ color: brandColor }} className="font-bold text-sm uppercase tracking-widest">{userData?.package}</span>
              </div>
            )}
          </div>
          <button style={{ backgroundColor: brandColor }} className="text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm">
            <Plus className="h-5 w-5" /> Submit Application
          </button>
        </header>

        {/* Feature Grid with Locking Mechanism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {allFeatures.map((feature) => {
            const locked = isFeatureLocked(feature.minPackage);
            return (
              <div key={feature.id} className={`relative p-6 rounded-[2rem] border-2 transition-all duration-300 ${locked ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white shadow-sm border-white hover:shadow-2xl hover:shadow-emerald-100'}`}>
                {locked && (
                  <div className="absolute top-4 right-4 bg-slate-200 p-1.5 rounded-full">
                    <Lock className="h-3 w-3 text-slate-500" />
                  </div>
                )}
                <div style={{ color: locked ? '#cbd5e1' : brandColor }} className={`mb-5 p-3 rounded-2xl w-fit ${locked ? 'bg-slate-100' : 'bg-emerald-50'}`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className={`font-bold text-[13px] leading-tight ${locked ? 'text-slate-400' : 'text-slate-800'}`}>{feature.name}</h3>
                <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">
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