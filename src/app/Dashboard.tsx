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
        EduStream Engine Loading...
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#F8FAF9] overflow-hidden">
      
      {/* 1. SIDEBAR - Fully Fixed & Shrunk for more space */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-100 flex flex-col shrink-0 z-30">
        <div className="p-6 lg:p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg font-black italic shrink-0">E</div>
          <div className="hidden lg:block leading-none">
             <h1 className="text-lg font-black italic tracking-tighter text-slate-800 uppercase">EduStream</h1>
             <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">B2B Processing</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-6">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Student Files" },
            { icon: FileText, label: "Commissions" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={20} />
              <span className="hidden lg:block font-bold text-[11px] uppercase tracking-wide">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* HEADER */}
        <header className="h-20 lg:h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-20 shrink-0">
          <div className="min-w-0">
            <h2 className="text-xl lg:text-2xl font-black text-slate-800 italic uppercase tracking-tighter truncate">
              Hi, {userData?.companyName || 'Rakhi'}!
            </h2>
            <p className="text-[9px] font-bold text-emerald-500 tracking-widest uppercase">Global Partner Portal</p>
          </div>
          <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-100 flex items-center gap-2 shrink-0">
            <Plus size={16} strokeWidth={3} /> <span className="hidden sm:inline">Add Student</span>
          </button>
        </header>

        {/* SCROLLABLE DASHBOARD */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10">
          
          {/* STATS - Fixed Grid with Flex-Wrap Logic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { label: 'Total Files', value: userData?.stats?.totalFiles || '245', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Processing', value: userData?.stats?.processing || '89', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Successful', value: userData?.stats?.success || '156', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50' },
              { label: 'Revenue', value: userData?.stats?.revenue || '$12k', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={26} />
                </div>
                <h4 className="text-5xl font-black text-slate-800 tracking-tighter mb-1">{stat.value}</h4>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* MAIN GRID HUB */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Recent Updates - Takes 8 cols */}
            <div className="xl:col-span-8 bg-white rounded-[3rem] p-8 lg:p-10 shadow-sm border border-slate-50 min-h-[400px]">
              <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                 <h3 className="font-black text-xl lg:text-2xl text-slate-800 italic uppercase tracking-tighter">Recent Processing Activity</h3>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Real-time DB Sync</span>
                 </div>
              </div>

              <div className="space-y-4">
                {userData?.recentSubmissions?.length > 0 ? (
                  userData.recentSubmissions.slice(0, 3).map((sub: any, i: number) => (
                    <div key={i} className="flex flex-wrap items-center justify-between p-6 rounded-[2rem] bg-slate-50/50 border border-transparent hover:border-emerald-100 transition-all gap-4">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-xl font-black text-slate-200 shadow-sm">S</div>
                        <div>
                          <p className="font-bold text-slate-800 text-lg">Student: <span className="text-emerald-600 underline">In Review</span></p>
                          <p className="text-[10px] text-slate-400 uppercase font-black mt-0.5 tracking-wider">Passport: {sub.passportNo || 'REF-N/A'}</p>
                        </div>
                      </div>
                      <button className="bg-white text-emerald-500 border border-emerald-100 text-[9px] font-black px-6 py-2 rounded-full uppercase italic hover:bg-emerald-500 hover:text-white transition-all">Download Report</button>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center text-slate-300 font-bold italic uppercase tracking-tighter opacity-50">No Data Streams Found</div>
                )}
              </div>
            </div>

            {/* AI HUB CARD - Takes 4 cols */}
            <div className="xl:col-span-4 bg-[#0A192F] rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-center min-h-[400px] group shadow-2xl">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-3xl font-black mb-4 italic uppercase leading-none tracking-tighter">AI Eligibility<br/><span className="text-emerald-500">Checker</span></h3>
                  <p className="text-slate-400 text-[10px] leading-relaxed mb-10 font-medium italic">Verify university requirements instantly via B2B model.</p>
                  <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all active:scale-95 shadow-xl shadow-emerald-900/20">
                      Launch AI Assistant
                  </button>
                </div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]"></div>
            </div>
          </div>

          {/* SERVICE SUITE - Fluid Wrapping Fix */}
          <div className="space-y-8 pb-10">
            <div className="flex items-center gap-3 mb-10">
               <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
               <h3 className="font-black text-2xl lg:text-3xl italic text-slate-800 uppercase tracking-tighter">Partner B2B Service Suite</h3>
            </div>
            
            {/* Eikhane auto-cols logic kora hoyeche jate width constraint na thake */}
            <div className="flex flex-wrap gap-6 justify-start">
              {allFeatures.map((feature) => {
                const locked = isFeatureLocked(feature.minPackage);
                return (
                  <div key={feature.id} 
                    onClick={() => handleFeatureClick(feature.id, locked)}
                    className={`flex-1 min-w-[180px] max-w-[240px] p-8 rounded-[3.5rem] border-2 transition-all cursor-pointer ${locked ? 'bg-slate-50 border-transparent opacity-40 grayscale' : 'bg-white border-white hover:border-emerald-100 hover:shadow-xl hover:-translate-y-1'}`}>
                    <div className={`mb-6 p-5 rounded-2xl w-fit ${locked ? 'bg-slate-100 text-slate-300' : 'bg-emerald-50 text-emerald-500'}`}>
                      <feature.icon size={28} strokeWidth={2.5} />
                    </div>
                    <h3 className="font-black text-[13px] text-slate-800 mb-2 italic uppercase leading-tight">{feature.name}</h3>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{locked ? 'Locked' : 'Active Access'}</p>
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