import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, CheckCircle2,
  Clock, LayoutDashboard, Settings
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

// Components 
import CloudManager from '../components/dashboard/features/CloudManager';
import AIAssessment from '../components/dashboard/features/AIAssessment';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const allFeatures = [
    { id: 'ai_assessment', name: 'AI Assessment', icon: Zap, minPackage: 'Basic' },
    { id: 'cloudinary', name: 'Cloud Manager', icon: Camera, minPackage: 'Basic' },
    { id: 'tracking', name: '20-Step Track', icon: BarChart3, minPackage: 'Basic' },
    { id: 'mail_alerts', name: 'Mail Alerts', icon: Bell, minPackage: 'Standard' },
    { id: 'invoicing', name: 'Smart Invoice', icon: FileText, minPackage: 'Standard' },
    { id: 'compliance', name: 'Compliance', icon: Users, minPackage: 'Standard' },
    { id: 'marketing', name: 'Marketing Studio', icon: Globe, minPackage: 'Professional' },
    { id: 'qr_tracking', name: 'QR Tracking', icon: Database, minPackage: 'Professional' },
    { id: 'ticketing', name: 'Ticketing System', icon: ShieldCheck, minPackage: 'Professional' },
    { id: 'support', name: 'Priority Support', icon: MessageSquare, minPackage: 'Professional' },
  ];

  useEffect(() => {
    if (!auth.currentUser) return;
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      if (doc.exists()) setUserData(doc.data());
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isFeatureLocked = (minPackage: string) => {
    if (userData?.status === 'trial') return false; 
    const packages = ['Basic', 'Standard', 'Professional'];
    const userPkg = userData?.package || 'Basic';
    return packages.indexOf(userPkg) < packages.indexOf(minPackage);
  };

  const handleFeatureClick = (featureId: string, locked: boolean) => {
    if (locked) {
      alert("Please upgrade your package to access this feature.");
      return;
    }
    if (featureId === 'cloudinary' || featureId === 'ai_assessment') {
      setActiveFeature(featureId);
    } else {
      alert(`${featureId.replace('_', ' ').toUpperCase()} is being integrated. Available in next update!`);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#F8FAF9]">
      <div className="text-emerald-500 font-black italic animate-bounce text-2xl tracking-tighter">
        EDU-STREAM HUB INITIALIZING...
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#F8FAF9] font-sans text-slate-700 overflow-hidden">
      
      {/* 1. SIDEBAR - FIXED & SLEEK */}
      <aside className="w-20 lg:w-72 bg-white border-r border-emerald-50 flex flex-col shrink-0 z-30 shadow-sm">
        <div className="p-6 lg:p-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg font-black text-xl italic shrink-0">E</div>
          <div className="hidden lg:block leading-tight">
             <h1 className="text-xl font-black italic tracking-tighter text-slate-800 uppercase">EduStream</h1>
             <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest leading-none">B2B Processing Hub</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 lg:px-6 space-y-2 mt-4">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Student Files" },
            { icon: FileText, label: "Commissions" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={22} />
              <span className="hidden lg:block font-bold text-sm tracking-tight uppercase">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN DASHBOARD AREA */}
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        
        {/* HEADER - Wide & Sticky */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-emerald-50 flex items-center justify-between px-6 lg:px-12 shrink-0">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-800 italic uppercase tracking-tighter leading-none">
              Hi, {userData?.companyName || 'Partner'}!
            </h2>
            <p className="text-[10px] font-bold text-emerald-500 tracking-[0.2em] uppercase mt-1">Agency Portal Dashboard</p>
          </div>
          <button 
            onClick={() => setActiveFeature('cloudinary')} 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 lg:px-10 py-4 rounded-2xl font-black text-[10px] lg:text-xs uppercase tracking-widest shadow-xl shadow-emerald-200 transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus size={18} strokeWidth={3} /> Add Student
          </button>
        </header>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-12 bg-[#F8FAF9]">
          
          {/* STATS SECTION - Grid Responsive Fix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-10">
            {[
              { label: 'Active Students', value: userData?.stats?.totalFiles || '245', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Files in Process', value: userData?.stats?.processing || '89', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Completed Files', value: userData?.stats?.success || '156', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50' },
              { label: 'B2B Revenue', value: userData?.stats?.revenue || '$12k', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 lg:p-10 rounded-[3rem] border border-white shadow-xl shadow-slate-200/30 hover:shadow-2xl transition-all group">
                <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={30} />
                </div>
                <h4 className="text-5xl lg:text-6xl font-black text-slate-800 mb-1 tracking-tighter">{stat.value}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ACTIVITY & AI HUB - 2 Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Recent Status Box */}
            <div className="xl:col-span-2 bg-white rounded-[4rem] p-8 lg:p-12 shadow-xl shadow-slate-200/30 border border-white">
              <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-8">
                <h3 className="font-black text-2xl lg:text-3xl text-slate-800 italic uppercase tracking-tighter">Recent Status</h3>
                <span className="bg-emerald-50 text-emerald-600 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest">Live Sync</span>
              </div>

              <div className="space-y-4">
                {userData?.recentSubmissions?.length > 0 ? (
                  userData.recentSubmissions.slice(0, 3).reverse().map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-[2.5rem] bg-slate-50/50 border border-transparent hover:border-emerald-100 transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl font-black text-slate-200 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                          {(sub.studentName || "S").charAt(0)}
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-800">
                             <span className="text-emerald-600 font-black">{sub.studentName}</span>
                          </p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Passport: {sub.passportNo || 'REF-N/A'}</p>
                        </div>
                      </div>
                      <div className="hidden sm:block text-right">
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-6 py-2 rounded-full uppercase italic border border-emerald-100">Reviewing</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center text-slate-200 font-black italic text-2xl uppercase tracking-tighter opacity-30">No Active Files</div>
                )}
              </div>
            </div>

            {/* AI HUB CARD */}
            <div className="bg-[#0A192F] rounded-[4rem] p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center border border-slate-800 group">
                <div className="relative z-10 text-center xl:text-left">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 mx-auto xl:mx-0 shadow-lg shadow-emerald-500/20"><Zap size={36} /></div>
                  <h3 className="text-4xl font-black mb-4 italic uppercase leading-none tracking-tighter">AI Eligibility<br/><span className="text-emerald-500 underline decoration-2 underline-offset-4">Checker</span></h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed mb-10 font-medium italic opacity-80">Instant B2B university requirement model.</p>
                  <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-6 bg-emerald-500 hover:bg-emerald-600 rounded-3xl font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl shadow-emerald-500/30 active:scale-95">
                      Launch AI Engine
                  </button>
                </div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
            </div>
          </div>

          {/* SERVICE SUITE GRID - Final Pill Shape Fix */}
          <div className="pt-8">
            <div className="flex items-center gap-4 mb-12">
               <div className="h-10 w-2 bg-emerald-500 rounded-full"></div>
               <h3 className="font-black text-3xl italic text-slate-800 uppercase tracking-tighter">Partner B2B Suite</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8 pb-10">
              {allFeatures.map((feature) => {
                const locked = isFeatureLocked(feature.minPackage);
                return (
                  <div key={feature.id} 
                    onClick={() => handleFeatureClick(feature.id, locked)}
                    className={`p-8 lg:p-10 rounded-[3.5rem] border-2 transition-all duration-500 ${locked ? 'bg-slate-50 border-transparent opacity-40 grayscale cursor-not-allowed' : 'bg-white border-white hover:border-emerald-200 hover:shadow-2xl hover:-translate-y-2 cursor-pointer shadow-xl shadow-slate-200/20 group'}`}>
                    <div className={`mb-6 p-6 rounded-[1.8rem] w-fit shadow-sm ${locked ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500'}`}>
                      <feature.icon size={32} strokeWidth={2.5} />
                    </div>
                    <h3 className="font-black text-sm lg:text-base text-slate-800 mb-2 tracking-tight italic uppercase">{feature.name}</h3>
                    <div className="flex items-center justify-between">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{locked ? 'Upgrade' : 'Active Access'}</p>
                        {locked && <Lock size={14} className="text-slate-300" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* OVERLAYS */}
      {activeFeature === 'cloudinary' && <CloudManager isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'ai_assessment' && <AIAssessment isOpen={true} onClose={() => setActiveFeature(null)} />}
    </div>
  );
};

export default Dashboard;