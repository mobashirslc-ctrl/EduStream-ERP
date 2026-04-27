import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, CheckCircle2,
  Clock, LayoutDashboard, Settings, ChevronRight
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

// Sub-Components
import CloudManager from '../components/dashboard/features/CloudManager';
import AIAssessment from '../components/dashboard/features/AIAssessment';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Requirements: Dynamic Feature List with Package Restrictions
  const allFeatures = [
    { id: 'ai_assessment', name: 'AI Assessment', icon: Zap, minPkg: 'Basic' },
    { id: 'cloudinary', name: 'Cloud Manager', icon: Camera, minPkg: 'Basic' },
    { id: 'tracking', name: '20-Step Track', icon: BarChart3, minPkg: 'Basic' },
    { id: 'mail_alerts', name: 'Mail Alerts', icon: Bell, minPkg: 'Standard' },
    { id: 'invoicing', name: 'Smart Invoice', icon: FileText, minPkg: 'Standard' },
    { id: 'compliance', name: 'Compliance Hub', icon: ShieldCheck, minPkg: 'Standard' },
    { id: 'marketing', name: 'Marketing Studio', icon: Globe, minPkg: 'Professional' },
    { id: 'support', name: 'Priority Support', icon: MessageSquare, minPkg: 'Professional' },
  ];

  useEffect(() => {
    if (!auth.currentUser) return;
    
    // Requirement: Real-time Firestore Sync
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        setUserData(doc.data());
      }
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
        EduStream Engine Syncing...
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#F8FAF9] overflow-hidden font-sans">
      
      {/* 1. SIDEBAR - Exact Branding Alignment */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col shrink-0 z-30 shadow-sm">
        <div className="p-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg font-black italic text-xl shrink-0">E</div>
            <h1 className="text-2xl font-black italic tracking-tighter text-slate-800 uppercase leading-none">EduStream</h1>
          </div>
          <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-3 ml-1 opacity-80">B2B Processing Hub</p>
        </div>
        
        <nav className="flex-1 px-6 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Student Files" },
            { icon: FileText, label: "Commissions" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={18} />
              <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* HEADER - Wide & Professional */}
        <header className="h-28 flex items-center justify-between px-12 bg-white/40 backdrop-blur-md sticky top-0 z-20 border-b border-slate-50 shrink-0">
          <div>
            <h2 className="text-3xl font-black text-slate-800 italic uppercase tracking-tighter leading-none">
              Hi, <span className="text-emerald-500">{userData?.companyName || 'Rakhi'}!</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-2">Status: <span className="text-emerald-500 italic uppercase">{userData?.status || 'Active'} Partner</span></p>
          </div>
          <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-emerald-100 flex items-center gap-3">
            <Plus size={18} strokeWidth={4} /> Add New Student
          </button>
        </header>

        <div className="p-12 space-y-12">
          
          {/* STATS - Forced Horizontal Chowra Pill Shape */}
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
            {[
              { label: 'Total Files', value: userData?.stats?.totalFiles || '245', icon: Users, color: 'text-emerald-500' },
              { label: 'In Process', value: userData?.stats?.processing || '89', icon: Clock, color: 'text-blue-500' },
              { label: 'Successful', value: userData?.stats?.success || '156', icon: CheckCircle2, color: 'text-cyan-500' },
              { label: 'B2B Revenue', value: userData?.stats?.revenue || '$12k', icon: BarChart3, color: 'text-teal-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/10 flex items-center gap-6 hover:-translate-y-1 transition-all">
                <div className="bg-slate-50 p-5 rounded-2xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                  <stat.icon size={28} />
                </div>
                <div>
                  <h4 className="text-4xl font-black text-slate-800 tracking-tighter leading-none">{stat.value}</h4>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MAIN GRID - Optimized Proportions */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Recent Processing Updates - Chowra Box (7 Columns) */}
            <div className="xl:col-span-7 bg-white rounded-[3.5rem] p-10 shadow-xl shadow-slate-200/10 border border-white">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                <h3 className="font-black text-2xl text-slate-800 italic uppercase tracking-tighter">Recent Processing Activity</h3>
                <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">Live Updates</span>
              </div>

              <div className="space-y-4">
                {userData?.recentSubmissions?.length > 0 ? (
                  userData.recentSubmissions.slice(0, 3).map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group border border-transparent hover:border-emerald-50">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-300 font-bold border border-slate-100 shadow-sm">S</div>
                        <div>
                          <p className="font-black text-slate-800 italic uppercase leading-none mb-1">Student: <span className="text-emerald-500">In Review</span></p>
                          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Passport: {sub.passportNo || 'REF-N/A'}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-200 group-hover:text-emerald-500 transition-colors" size={20} />
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center text-slate-200 font-black italic uppercase text-2xl tracking-tighter opacity-40">No Files Streams</div>
                )}
              </div>
            </div>

            {/* AI HUB CARD - Chowra Content (5 Columns) */}
            <div className="xl:col-span-5 bg-[#0A192F] rounded-[3.5rem] p-12 text-white relative overflow-hidden flex flex-col justify-center shadow-2xl group border border-slate-800 min-h-[400px]">
                <div className="relative z-10">
                  <Zap className="text-emerald-500 mb-8 group-hover:rotate-12 transition-transform duration-500" size={48} fill="currentColor" />
                  <h3 className="text-5xl font-black mb-4 italic uppercase leading-[0.85] tracking-tighter">AI Eligibility<br/><span className="text-emerald-500">Checker</span></h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-10 font-medium italic opacity-70">Verify B2B university requirements instantly. Accurate engine ready.</p>
                  <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all text-[#0A192F] shadow-xl shadow-emerald-500/20 active:scale-95">
                      Launch Assistant
                  </button>
                </div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]"></div>
            </div>
          </div>

          {/* SERVICE SUITE - Exact Pill Wrapping (Wide cards) */}
          <div className="space-y-8 pb-20">
            <div className="flex items-center gap-3">
              <div className="h-8 w-2 bg-emerald-500 rounded-full"></div>
              <h3 className="font-black text-3xl italic text-slate-800 uppercase tracking-tighter">Partner B2B Suite</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {allFeatures.map((f) => {
                const locked = isLocked(f.minPkg);
                return (
                  <div key={f.id} 
                    onClick={() => !locked && setActiveFeature(f.id === 'cloudinary' || f.id === 'ai_assessment' ? f.id : null)}
                    className={`p-10 rounded-[3rem] border-2 transition-all flex flex-col items-center text-center relative ${locked ? 'bg-slate-50 border-transparent opacity-40 grayscale cursor-not-allowed' : 'bg-white border-white hover:border-emerald-100 hover:shadow-2xl hover:-translate-y-1 cursor-pointer shadow-xl shadow-slate-200/5 group'}`}>
                    
                    <div className={`mb-6 p-5 rounded-2xl transition-all ${locked ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white shadow-sm'}`}>
                      <f.icon size={28} />
                    </div>
                    
                    <h3 className="font-black text-[13px] text-slate-800 mb-2 italic uppercase leading-tight tracking-tight">{f.name}</h3>
                    <div className="flex items-center gap-2">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{locked ? 'Locked' : 'Active'}</p>
                       {locked && <Lock size={12} className="text-slate-300" />}
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