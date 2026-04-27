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
        EDUSTREAM ENGINE LOADING...
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#F8FAF9] overflow-hidden font-sans">
      
      {/* 1. SIDEBAR - Exact Logo Position */}
      <aside className="w-20 lg:w-72 bg-white border-r border-slate-100 flex flex-col shrink-0 z-30">
        <div className="p-10 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg font-black italic shrink-0 text-xl">E</div>
            <h1 className="hidden lg:block text-2xl font-black italic tracking-tighter text-slate-800 uppercase leading-none">EduStream</h1>
          </div>
          <p className="hidden lg:block text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-3 ml-1 opacity-80 italic">B2B Processing Hub</p>
        </div>
        
        <nav className="flex-1 px-6 space-y-2 mt-2">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Student Files" },
            { icon: FileText, label: "Partner Commissions" },
            { icon: Settings, label: "Agency Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={20} />
              <span className="hidden lg:block text-[11px] uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER */}
        <header className="h-28 bg-white/40 backdrop-blur-md border-b border-slate-50 flex items-center justify-between px-12 lg:px-16 sticky top-0 z-20 shrink-0">
          <div>
            <h2 className="text-3xl font-black text-slate-800 italic uppercase tracking-tighter leading-none">
              Welcome, <span className="text-emerald-500">{userData?.companyName || 'Rakhi'}!</span>
            </h2>
            <div className="flex items-center gap-3 mt-2">
               <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">MNC Level B2B Portal</span>
               <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter">Status: Active</span>
               </div>
            </div>
          </div>
          <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-emerald-100 flex items-center gap-3 shrink-0 active:scale-95">
            <Plus size={18} strokeWidth={4} /> Add New Student
          </button>
        </header>

        {/* SCROLLABLE DASHBOARD */}
        <div className="flex-1 overflow-y-auto p-12 lg:p-16 space-y-16">
          
          {/* STATS - Wide Horizontal Pill Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
            {[
              { label: 'Total Files', value: userData?.stats?.totalFiles || '245', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Processing', value: userData?.stats?.processing || '89', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Successful', value: userData?.stats?.success || '156', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50' },
              { label: 'Revenue', value: userData?.stats?.revenue || '$12k', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-white shadow-xl shadow-slate-200/20 flex flex-col items-center group hover:-translate-y-1 transition-all">
                <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:rotate-6 transition-transform`}>
                  <stat.icon size={28} />
                </div>
                <div className="text-center">
                   <h4 className="text-6xl font-black text-slate-800 tracking-tighter mb-1">{stat.value}</h4>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MAIN GRID - Wider Components */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            
            {/* Recent Processing Updates - (7 Columns for Width) */}
            <div className="xl:col-span-7 bg-white rounded-[4rem] p-12 shadow-2xl shadow-slate-200/10 border border-white flex flex-col min-h-[500px]">
              <div className="flex items-center justify-between mb-12 pb-8 border-b border-slate-50">
                 <h3 className="font-black text-3xl text-slate-800 italic uppercase tracking-tighter">Recent Processing Activity</h3>
                 <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Real-time DB Sync</span>
                 </div>
              </div>

              <div className="space-y-6 flex-1">
                {userData?.recentSubmissions?.length > 0 ? (
                  userData.recentSubmissions.slice(0, 3).map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-8 rounded-[3rem] bg-slate-50/50 hover:bg-white hover:shadow-lg border border-transparent hover:border-emerald-50 transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-black text-slate-200 border border-slate-100 shadow-sm">S</div>
                        <div>
                          <p className="font-black text-slate-800 text-xl uppercase tracking-tighter italic leading-none mb-2">Student: <span className="text-emerald-500">In Review</span></p>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Passport: REF-N/A</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-emerald-500 text-white text-[10px] font-black px-8 py-3 rounded-full uppercase italic hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">Download Report</button>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-200 opacity-50">
                    <Database size={64} className="mb-4" />
                    <p className="font-black italic text-2xl uppercase tracking-tighter">No Active Streams Found</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI HUB CARD - (5 Columns for Balance) */}
            <div className="xl:col-span-5 bg-[#0A192F] rounded-[4rem] p-14 text-white relative overflow-hidden flex flex-col justify-center min-h-[500px] shadow-2xl group border border-slate-800">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mb-10 shadow-3xl shadow-emerald-500/20 group-hover:rotate-12 transition-transform duration-500">
                    <Zap size={44} fill="currentColor" />
                  </div>
                  <h3 className="text-6xl font-black mb-6 italic uppercase leading-[0.8] tracking-tighter">AI Eligibility<br/><span className="text-emerald-500">Checker</span></h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-12 font-medium italic opacity-70">Verify university requirements instantly via B2B model logic. Real-time assessment engine.</p>
                  <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-6 bg-emerald-500 hover:bg-emerald-400 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.4em] transition-all active:scale-95 text-[#0A192F] shadow-xl shadow-emerald-500/20">
                      Launch AI Assistant
                  </button>
                </div>
                {/* Decoration */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute right-12 bottom-12 text-white/5 font-black text-9xl uppercase tracking-tighter select-none pointer-events-none group-hover:translate-y-4 transition-all duration-700 italic">CORE</div>
            </div>
          </div>

          {/* SERVICE SUITE - Wide Responsive Grid */}
          <div className="space-y-12 pb-24">
            <div className="flex items-center gap-4">
               <div className="h-10 w-2.5 bg-emerald-500 rounded-full"></div>
               <h3 className="font-black text-4xl italic text-slate-800 uppercase tracking-tighter">Partner B2B Service Suite</h3>
            </div>
            
            {/* Chowra layout-er jonno grid-cols logic ekhon beshi columns use korbe */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {allFeatures.map((feature) => {
                const locked = isFeatureLocked(feature.minPackage);
                return (
                  <div key={feature.id} 
                    onClick={() => handleFeatureClick(feature.id, locked)}
                    className={`p-10 rounded-[4rem] border-2 transition-all duration-500 cursor-pointer flex flex-col items-center text-center ${locked ? 'bg-slate-50 border-transparent opacity-40 grayscale cursor-not-allowed' : 'bg-white border-white hover:border-emerald-100 hover:shadow-2xl hover:-translate-y-2 shadow-xl shadow-slate-200/10 group'}`}>
                    <div className={`mb-8 p-6 rounded-[2rem] shadow-sm transition-all duration-500 ${locked ? 'bg-slate-100 text-slate-300' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                      <feature.icon size={34} strokeWidth={2.5} />
                    </div>
                    <h3 className="font-black text-[15px] text-slate-800 mb-3 italic uppercase tracking-tight leading-tight">{feature.name}</h3>
                    <div className="flex items-center gap-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{locked ? 'LOCKED' : 'ACTIVE'}</p>
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