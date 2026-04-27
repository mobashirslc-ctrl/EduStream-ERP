import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, CheckCircle2,
  Clock, LayoutDashboard, Settings, ChevronRight
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Requirement: Full 10 Features List
  const allFeatures = [
    { id: 'ai_assessment', name: 'AI Assessment', icon: Zap, minPkg: 'Basic' },
    { id: 'cloudinary', name: 'Cloud Manager', icon: Camera, minPkg: 'Basic' },
    { id: 'tracking', name: '20-Step Track', icon: BarChart3, minPkg: 'Basic' },
    { id: 'mail_alerts', name: 'Mail Alerts', icon: Bell, minPkg: 'Standard' },
    { id: 'invoicing', name: 'Smart Invoice', icon: FileText, minPkg: 'Standard' },
    { id: 'compliance', name: 'Compliance Hub', icon: ShieldCheck, minPkg: 'Standard' },
    { id: 'marketing', name: 'Marketing Studio', icon: Globe, minPkg: 'Professional' },
    { id: 'qr_tracking', name: 'QR Tracking', icon: Database, minPkg: 'Professional' },
    { id: 'ticketing', name: 'Ticketing System', icon: Users, minPkg: 'Professional' },
    { id: 'support', name: 'Priority Support', icon: MessageSquare, minPkg: 'Professional' },
  ];

  useEffect(() => {
    if (!auth.currentUser) return;
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      if (doc.exists()) setUserData(doc.data());
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isLocked = (minPkg: string) => {
    if (userData?.status === 'trial') return false;
    const hierarchy: any = { 'Basic': 1, 'Standard': 2, 'Professional': 3 };
    const userRank = hierarchy[userData?.package || 'Basic'];
    const requiredRank = hierarchy[minPkg];
    return userRank < requiredRank;
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#F8FAF9]">
      <div className="text-emerald-500 font-black italic animate-pulse text-2xl uppercase tracking-tighter">
        EDUSTREAM ENGINE SYNCING...
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#F8FAF9] overflow-hidden font-sans">
      
      {/* 1. SIDEBAR - Exact Logo & Company Name Placement */}
      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col shrink-0 z-50">
        <div className="p-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg font-black italic text-2xl shrink-0">E</div>
            <h1 className="text-3xl font-black italic tracking-tighter text-slate-800 uppercase leading-none">EduStream</h1>
          </div>
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-4 ml-1 opacity-80 italic">B2B Processing Hub</p>
        </div>
        
        <nav className="flex-1 px-8 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Student Files" },
            { icon: FileText, label: "Commissions" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-5 rounded-3xl cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={20} />
              <span className="text-[12px] font-black uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP HEADER */}
        <header className="h-32 flex items-center justify-between px-16 bg-white/60 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-50 shrink-0">
          <div>
            <h2 className="text-4xl font-black text-slate-800 italic uppercase tracking-tighter leading-none">
              Welcome, <span className="text-emerald-500">{userData?.companyName || 'Rakhi'}!</span>
            </h2>
            <div className="flex items-center gap-3 mt-3">
               <span className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase italic">Global Agency Partner Portal</span>
               <div className="px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter italic">Status: Active</span>
               </div>
            </div>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-5 rounded-[2rem] font-black text-[12px] uppercase tracking-widest transition-all shadow-2xl shadow-emerald-200 flex items-center gap-4 active:scale-95 shrink-0">
            <Plus size={20} strokeWidth={4} /> Add New Student
          </button>
        </header>

        {/* SCROLLABLE DASHBOARD CONTENT */}
        <div className="p-16 space-y-16 w-full max-w-[1800px] mx-auto">
          
          {/* STATS - Chowra Pill Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              { label: 'Total Files', value: '245', icon: Users, color: 'text-emerald-500' },
              { label: 'In Process', value: '89', icon: Clock, color: 'text-blue-500' },
              { label: 'Successful', value: '156', icon: CheckCircle2, color: 'text-cyan-500' },
              { label: 'B2B Revenue', value: '$12k', icon: BarChart3, color: 'text-teal-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-white shadow-xl shadow-slate-200/20 flex flex-row items-center gap-8 group hover:-translate-y-1 transition-all">
                <div className="bg-slate-50 p-6 rounded-[2rem] text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors shrink-0"><stat.icon size={32} /></div>
                <div className="flex-1">
                  <h4 className="text-5xl font-black text-slate-800 tracking-tighter leading-none mb-1">{stat.value}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MAIN GRID - Optimized Components */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            
            {/* Recent Processing - Wide Card (7 Columns) */}
            <div className="xl:col-span-7 bg-white rounded-[4rem] p-12 shadow-2xl shadow-slate-200/10 border border-white">
              <div className="flex items-center justify-between mb-12">
                 <h3 className="font-black text-3xl text-slate-800 italic uppercase tracking-tighter">Recent Processing Activity</h3>
                 <span className="bg-emerald-50 text-emerald-500 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic animate-pulse">Live Tracking</span>
              </div>

              <div className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-10 rounded-[3rem] bg-slate-50/50 hover:bg-white hover:shadow-2xl transition-all group border border-transparent hover:border-emerald-50">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-200 font-black text-2xl border border-slate-100 shadow-sm shrink-0">S</div>
                      <div>
                        <p className="font-black text-slate-800 text-xl uppercase tracking-tighter italic leading-none mb-2">Student: <span className="text-emerald-500">In Review</span></p>
                        <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em] italic">Passport: REF-N/A • DB: CloudSync</p>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-200 group-hover:text-emerald-500 transition-all group-hover:translate-x-2" size={24} />
                  </div>
                ))}
              </div>
            </div>

            {/* AI HUB CARD - Balanced Width (5 Columns) */}
            <div className="xl:col-span-5 bg-[#0A192F] rounded-[4rem] p-14 text-white relative overflow-hidden flex flex-col justify-center shadow-2xl border border-slate-800 group">
                <div className="relative z-10">
                  <Zap className="text-emerald-500 mb-10 group-hover:rotate-12 transition-transform duration-500" size={56} fill="currentColor" />
                  <h3 className="text-6xl font-black mb-6 italic uppercase leading-[0.85] tracking-tighter">AI Eligibility<br/><span className="text-emerald-500">Checker</span></h3>
                  <button className="w-full py-6 bg-emerald-500 hover:bg-emerald-400 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.4em] transition-all text-[#0A192F] shadow-2xl shadow-emerald-500/20 active:scale-95">
                      Launch Assistant
                  </button>
                </div>
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute left-10 bottom-10 text-white/5 font-black text-9xl uppercase tracking-tighter select-none pointer-events-none italic group-hover:translate-x-4 transition-transform duration-700">CORE</div>
            </div>
          </div>

          {/* SERVICE SUITE - Horizontal Wrapped Grid (Full 10 Features) */}
          <div className="space-y-12 pb-24">
            <div className="flex items-center gap-4">
              <div className="h-10 w-2.5 bg-emerald-500 rounded-full"></div>
              <h3 className="font-black text-4xl italic text-slate-800 uppercase tracking-tighter">Partner B2B Service Suite</h3>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {allFeatures.map((f, i) => {
                const locked = isLocked(f.minPkg);
                return (
                  <div key={i} className={`bg-white p-10 rounded-[3.5rem] border-2 transition-all flex flex-col items-center text-center relative ${locked ? 'bg-slate-50 border-transparent opacity-40 grayscale cursor-not-allowed' : 'bg-white border-white hover:border-emerald-100 hover:shadow-2xl hover:-translate-y-2 cursor-pointer shadow-xl shadow-slate-200/5 group'}`}>
                    <div className={`mb-8 p-6 rounded-[2rem] transition-all ${locked ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white shadow-sm'}`}>
                      <f.icon size={32} />
                    </div>
                    <h3 className="font-black text-[14px] text-slate-800 mb-2 italic uppercase leading-tight tracking-tight">{f.name}</h3>
                    <div className="flex items-center gap-2">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{locked ? 'LOCKED' : 'ACTIVE'}</p>
                       {locked && <Lock size={12} className="text-slate-300" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;