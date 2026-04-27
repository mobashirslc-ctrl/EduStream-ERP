import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, CheckCircle2,
  Clock, LayoutDashboard, Settings, Download
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

  if (loading) return <div className="h-screen flex items-center justify-center text-emerald-500 font-bold italic animate-pulse tracking-tighter">EDU-STREAM HUB INITIALIZING...</div>;

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAF9] font-sans text-slate-700">
      
      {/* 1. SIDEBAR - Stays fixed but sleek */}
      <aside className="w-24 lg:w-80 bg-white border-r border-emerald-50 flex flex-col sticky top-0 h-screen shrink-0 z-30 shadow-sm">
        <div className="p-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100 font-black text-2xl italic">E</div>
          <div className="hidden lg:block leading-tight">
             <h1 className="text-2xl font-black italic tracking-tighter text-slate-800 uppercase">EduStream</h1>
             <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">B2B Processing Hub</p>
          </div>
        </div>
        
        <nav className="flex-1 px-8 space-y-4 mt-6">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Student Files" },
            { icon: FileText, label: "Partner Commissions" },
            { icon: Settings, label: "Agency Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-5 p-5 rounded-[1.8rem] cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={24} />
              <span className="hidden lg:block font-bold text-sm tracking-tight uppercase">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN DASHBOARD - Edge to Edge Ultra Wide */}
      <main className="flex-1 min-w-0 bg-[#F8FAF9] overflow-x-hidden">
        
        {/* HEADER - Wide Layout */}
        <header className="h-28 bg-white/80 backdrop-blur-md border-b border-emerald-50 flex items-center justify-between px-10 lg:px-20 sticky top-0 z-20 w-full">
          <div>
            <h2 className="text-4xl font-black text-slate-800 italic uppercase tracking-tighter">Hi, {userData?.companyName || 'Partner'}!</h2>
            <p className="text-xs font-bold text-emerald-500 tracking-[0.2em] uppercase mt-1">Global Agency Partner Portal</p>
          </div>
          <div className="flex items-center gap-8">
            <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-200 transition-all active:scale-95 flex items-center gap-3">
                <Plus size={20} strokeWidth={3} /> Add New Student
            </button>
          </div>
        </header>

        {/* PAGE CONTENT - Spreads to full width using px-20 */}
        <div className="p-10 lg:p-20 space-y-20 max-w-[2400px] mx-auto">
          
          {/* STATS SECTION - Figma Pill-Shaped Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-12">
            {[
              { label: 'Active Students', value: userData?.stats?.totalFiles || '245', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Files in Process', value: userData?.stats?.processing || '89', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Completed Files', value: userData?.stats?.success || '156', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50' },
              { label: 'B2B Revenue', value: userData?.stats?.revenue || '$12k', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-14 rounded-[4rem] border border-white shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all group">
                <div className={`${stat.bg} ${stat.color} w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={36} />
                </div>
                <h4 className="text-7xl font-black text-slate-800 mb-2 tracking-tighter">{stat.value}</h4>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* HUB GRID */}
          <div className="grid grid-cols-1 3xl:grid-cols-3 gap-16">
            
            {/* Recent Status - Uses maximum left space */}
            <div className="3xl:col-span-2 bg-white rounded-[4.5rem] p-16 shadow-xl shadow-slate-200/40 border border-white">
              <div className="flex items-center justify-between mb-12 border-b border-slate-50 pb-10">
                <h3 className="font-black text-4xl text-slate-800 italic uppercase tracking-tighter">Recent Processing Activity</h3>
                <span className="bg-emerald-50 text-emerald-600 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-sm">Real-time DB Sync</span>
              </div>

              <div className="space-y-8">
                {userData?.recentSubmissions?.length > 0 ? (
                  userData.recentSubmissions.slice(0, 4).reverse().map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-12 rounded-[3.5rem] hover:bg-emerald-50/20 transition-all border border-transparent hover:border-emerald-50 group cursor-pointer">
                      <div className="flex items-center gap-10">
                        <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-5xl font-black text-slate-200 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                          {(sub.studentName || "S").charAt(0)}
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-slate-800 tracking-tighter">
                             Student: <span className="text-emerald-600 font-black">{sub.studentName}</span>
                          </p>
                          <div className="flex gap-8 mt-4">
                             <button className="text-emerald-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
                                <FileText size={18}/> View Documents
                             </button>
                             <span className="text-slate-300 text-xs font-bold italic tracking-wider">Passport: {sub.passportNo || 'REF-N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-50 text-emerald-600 text-[12px] font-black px-10 py-4 rounded-full uppercase tracking-widest italic border border-emerald-100">In Review</span>
                        <p className="text-[10px] font-bold text-slate-300 mt-5 uppercase tracking-[0.2em]">Live Tracking</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center text-slate-200 font-black italic text-3xl uppercase tracking-tighter opacity-40">No student data streams found</div>
                )}
              </div>
            </div>

            {/* AI HUB CARD */}
            <div className="space-y-12">
              <div className="bg-[#0A192F] rounded-[4.5rem] p-16 text-white shadow-2xl relative overflow-hidden group min-h-[600px] flex flex-col justify-center border border-slate-800">
                 <div className="relative z-10">
                    <div className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-2xl shadow-emerald-500/40 group-hover:scale-110 transition-transform"><Zap size={48} /></div>
                    <h3 className="text-5xl font-black mb-8 italic uppercase leading-tight tracking-tighter">AI Eligibility<br/><span className="text-emerald-500 underline decoration-4 underline-offset-8">Checker 3.0</span></h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-14 font-medium italic opacity-80">Process international student assessments using our global university requirement model.</p>
                    <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-8 bg-emerald-500 hover:bg-emerald-600 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all shadow-2xl shadow-emerald-500/30 active:scale-95">
                        Launch AI Engine
                    </button>
                 </div>
                 <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              </div>
            </div>
          </div>

          {/* SERVICE SUITE - The Wide Pill Grid */}
          <div className="pt-16">
            <div className="flex items-center gap-8 mb-20">
               <div className="h-14 w-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-100"></div>
               <h3 className="font-black text-5xl italic text-slate-800 uppercase tracking-tighter">B2B Service Suite</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12">
              {allFeatures.map((feature) => {
                const locked = isFeatureLocked(feature.minPackage);
                return (
                  <div key={feature.id} 
                    onClick={() => handleFeatureClick(feature.id, locked)}
                    className={`p-14 rounded-[4rem] border-2 transition-all duration-700 ${locked ? 'bg-slate-100 border-transparent opacity-40 grayscale cursor-not-allowed shadow-inner' : 'bg-white border-white hover:border-emerald-200 hover:shadow-2xl hover:-translate-y-4 cursor-pointer shadow-xl shadow-slate-200/30 group'}`}>
                    <div className={`mb-10 p-8 rounded-[2rem] w-fit shadow-sm ${locked ? 'bg-slate-200 text-slate-400' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-200 transition-all duration-500'}`}>
                      <feature.icon size={42} strokeWidth={2.5} />
                    </div>
                    <h3 className="font-black text-xl text-slate-800 mb-4 tracking-tighter italic uppercase">{feature.name}</h3>
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{locked ? `Access Restricted` : 'Active Node'}</p>
                        {locked && <Lock size={18} className="text-slate-300" />}
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