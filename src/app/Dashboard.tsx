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
    if (locked) return alert("Please upgrade your package.");
    if (featureId === 'cloudinary' || featureId === 'ai_assessment') {
      setActiveFeature(featureId);
    } else {
      alert(`${featureId.replace('_', ' ').toUpperCase()} Coming Soon!`);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#F8FAF9]">
      <div className="text-emerald-500 font-black italic animate-pulse text-2xl tracking-tighter uppercase">
        EDUSTREAM HUB LOADING...
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#F8FAF9] overflow-hidden font-sans">
      
      {/* 1. SIDEBAR - Exact Branding Position */}
      <aside className="w-20 lg:w-72 bg-white border-r border-slate-100 flex flex-col shrink-0 z-30 shadow-sm">
        <div className="p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg font-black italic shrink-0">E</div>
            <h1 className="hidden lg:block text-2xl font-black italic tracking-tighter text-slate-800 uppercase leading-none">EduStream</h1>
          </div>
          <p className="hidden lg:block text-[9px] font-bold text-emerald-500 uppercase tracking-[0.25em] ml-1">B2B Processing Hub</p>
        </div>
        
        <nav className="flex-1 px-6 space-y-2 mt-4">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Student Files" },
            { icon: FileText, label: "Commissions" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600 shadow-sm font-bold' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={20} />
              <span className="hidden lg:block text-[11px] uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* HEADER - Fixed Alignment */}
        <header className="h-28 bg-white/60 backdrop-blur-xl border-b border-slate-50 flex items-center justify-between px-8 lg:px-14 sticky top-0 z-20 shrink-0">
          <div className="min-w-0">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-800 italic uppercase tracking-tighter leading-tight">
              Welcome, <span className="text-emerald-500">{userData?.companyName || 'Rakhi'}!</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Global Agency Partner Portal</span>
               <span className="bg-emerald-100 text-emerald-600 px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter">Status: Active</span>
            </div>
          </div>
          <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-emerald-100 flex items-center gap-3 shrink-0 active:scale-95">
            <Plus size={18} strokeWidth={4} /> Add New Student
          </button>
        </header>

        {/* SCROLLABLE DASHBOARD */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-14 space-y-14">
          
          {/* STATS - 4 Column Pill Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              { label: 'Total Files', value: userData?.stats?.totalFiles || '245', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Processing', value: userData?.stats?.processing || '89', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Successful', value: userData?.stats?.success || '156', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50' },
              { label: 'Revenue', value: userData?.stats?.revenue || '$12k', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-white shadow-xl shadow-slate-200/20 flex flex-col items-center text-center group hover:-translate-y-1 transition-all">
                <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} />
                </div>
                <h4 className="text-6xl font-black text-slate-800 tracking-tighter mb-1">{stat.value}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* MAIN GRID - CUSTOM WIDTHS (Recent Activity Narrower, AI Checker Wider) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            
            {/* Recent Processing Updates - Narrower (6 Cols) */}
            <div className="xl:col-span-7 bg-white rounded-[4rem] p-10 lg:p-12 shadow-xl shadow-slate-200/20 border border-white">
              <div className="flex items-center justify-between mb-10 pb-8 border-b border-slate-50">
                 <h3 className="font-black text-2xl lg:text-3xl text-slate-800 italic uppercase tracking-tighter leading-none">Recent Processing<br/>Updates</h3>
                 <div className="text-right">
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest underline decoration-2 cursor-pointer">Full Database →</p>
                 </div>
              </div>

              <div className="space-y-6">
                {userData?.recentSubmissions?.length > 0 ? (
                  userData.recentSubmissions.slice(0, 3).map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-8 rounded-[3rem] bg-slate-50/50 border border-transparent hover:bg-white hover:shadow-lg transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-black text-slate-200 shadow-sm border border-slate-100">S</div>
                        <div>
                          <p className="font-black text-slate-800 text-xl uppercase tracking-tighter italic">Student: <span className="text-emerald-500">In Review</span></p>
                          <div className="flex items-center gap-4 mt-1">
                             <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                <FileText size={12} className="text-emerald-500" /> 
                                <span className="uppercase tracking-widest">View Documents</span>
                             </div>
                             <span className="text-[10px] text-slate-300 font-bold italic uppercase tracking-widest">Passport: REF-N/A</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-6 py-2.5 rounded-full uppercase italic border border-emerald-100 shadow-sm">Progressing</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center">
                    <div className="text-slate-200 font-black italic text-3xl uppercase tracking-tighter opacity-40">No Live Streams</div>
                  </div>
                )}
              </div>
            </div>

            {/* AI HUB CARD - Wider (5 Cols) */}
            <div className="xl:col-span-5 bg-[#0A192F] rounded-[4rem] p-12 text-white relative overflow-hidden flex flex-col justify-center shadow-2xl border border-slate-800 group">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-emerald-500/40 group-hover:rotate-6 transition-all duration-500">
                    <Zap size={40} fill="currentColor" />
                  </div>
                  <h3 className="text-5xl font-black mb-6 italic uppercase leading-[0.9] tracking-tighter">AI Eligibility<br/><span className="text-emerald-500 underline decoration-4 underline-offset-8">Checker</span></h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-12 font-medium italic opacity-80 max-w-sm">Verify university requirements instantly via B2B model logic. High accuracy assessment engine ready.</p>
                  <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-6 bg-emerald-500 hover:bg-emerald-400 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all active:scale-95 shadow-xl shadow-emerald-500/20 text-[#0A192F]">
                      Launch AI Assistant
                  </button>
                </div>
                {/* Background Decoration */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
                <div className="absolute right-10 bottom-10 text-emerald-500/10 font-black italic text-9xl select-none uppercase tracking-tighter pointer-events-none group-hover:translate-y-4 transition-all duration-700">AI</div>
            </div>
          </div>

          {/* SERVICE SUITE - Pill Wrapping Optimization */}
          <div className="space-y-10 pb-20">
            <div className="flex items-center gap-4 mb-12">
               <div className="h-10 w-2.5 bg-emerald-500 rounded-full"></div>
               <h3 className="font-black text-3xl lg:text-4xl italic text-slate-800 uppercase tracking-tighter">Partner B2B Service Suite</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {allFeatures.map((feature) => {
                const locked = isFeatureLocked(feature.minPackage);
                return (
                  <div key={feature.id} 
                    onClick={() => handleFeatureClick(feature.id, locked)}
                    className={`p-10 rounded-[4rem] border-2 transition-all duration-500 cursor-pointer flex flex-col items-center text-center ${locked ? 'bg-slate-50 border-transparent opacity-40 grayscale cursor-not-allowed' : 'bg-white border-white hover:border-emerald-100 hover:shadow-2xl hover:-translate-y-2 shadow-xl shadow-slate-200/10 group'}`}>
                    <div className={`mb-8 p-6 rounded-[1.8rem] shadow-sm transition-all duration-500 ${locked ? 'bg-slate-100 text-slate-300' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                      <feature.icon size={32} strokeWidth={2.5} />
                    </div>
                    <h3 className="font-black text-[14px] lg:text-[15px] text-slate-800 mb-2 italic uppercase tracking-tight leading-tight">{feature.name}</h3>
                    <div className="flex items-center gap-2">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{locked ? 'Upgrade Plan' : 'Active Access'}</p>
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