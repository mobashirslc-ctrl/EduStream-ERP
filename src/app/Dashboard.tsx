"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, FileText, CheckCircle, TrendingUp, ArrowLeft, GraduationCap, 
  Plus, Upload, BarChart, Zap, Camera, Bell, ShieldCheck, 
  Globe, Database, MessageSquare, X, ExternalLink, Lock, Briefcase, LayoutGrid, Send
} from 'lucide-react';
import { auth, db } from '../lib/firebase'; 
import { doc, getDoc, collection, query, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

// --- FEATURE COMPONENTS ---
import { AIAssessor } from "../components/dashboard/features/AIAssessor";
import { CloudManager } from "../components/dashboard/features/CloudManager";
import { Compliance } from "../components/dashboard/features/Compliance"; 
import { MailAlerts } from "../components/dashboard/features/MailAlerts";
import { MarketingStudio } from "../components/dashboard/features/MarketingStudio";
import { QRTracking } from "../components/dashboard/features/QRTracking";
import { SmartInvoicing } from "../components/dashboard/features/SmartInvoicing"; 
import { Support } from "../components/dashboard/features/Support"; 
import { Ticketing } from "../components/dashboard/features/Ticketing"; 
import { TrackingSystem } from "../components/dashboard/features/TrackingSystem";
import { AgentHub } from "../components/dashboard/features/AgentHub";
import { EmployeeManagement } from "../components/dashboard/features/EmployeeManagement"; 

const countries = ["USA", "United Kingdom", "Canada", "Australia", "Germany", "Sweden", "Finland", "Norway", "Poland", "Malaysia"];

const PLAN_FEATURES: Record<string, string[]> = {
  starter: ["AI Assessment", "20-Step Track", "Cloud Manager", "Mail Alerts"],
  professional: [
    "AI Assessment", "20-Step Track", "Cloud Manager", "Mail Alerts",
    "Agent Network", "Team Hub", "Compliance Hub", "Marketing Studio", 
    "Smart Invoice", "QR Tracking"
  ],
  enterprise: [
    "AI Assessment", "20-Step Track", "Cloud Manager", "Mail Alerts",
    "Agent Network", "Team Hub", "Compliance Hub", "Marketing Studio", 
    "Smart Invoice", "QR Tracking", "Ticketing System", "Priority Support"
  ]
};

const hasAccess = (plan: string, featureName: string) => {
  const currentPlan = plan?.toLowerCase() || 'starter';
  return PLAN_FEATURES[currentPlan]?.includes(featureName) || false;
};

export default function ClientDashboard() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [userPackage, setUserPackage] = useState<string>('starter');
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isOwner, setIsOwner] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [uniData, setUniData] = useState({ name: '', country: '', course: '', cgpa: '', language: '', details: '' });
  const [realtimeStats, setRealtimeStats] = useState({ total: 0, pending: 0, completed: 0, rate: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let unsubscribeFiles: () => void;

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        if(user.email === "admin@yourdomain.com") setIsOwner(true);

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const plan = userData.package?.toLowerCase().trim() || 'starter';
          setUserPackage(plan);

          const registrationTime = userData.createdAt?.seconds ? userData.createdAt.toMillis() : Date.now();
          const planType = userData.planType || 'monthly';
          let duration = 30 * 24 * 60 * 60 * 1000; 
          if (planType === 'yearly') duration = 365 * 24 * 60 * 60 * 1000;
          if (planType === 'trial') duration = 2 * 60 * 60 * 1000; 
          const expiryTime = registrationTime + duration;

          interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = expiryTime - now;
            if (distance <= 0) {
              setTimeLeft("Expired");
              clearInterval(interval);
            } else {
              const days = Math.floor(distance / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance % (1000 * 60)) / 1000);
              setTimeLeft(planType === 'trial' ? `${hours}h ${minutes}m ${seconds}s` : `${days}d ${hours}h`);
            }
          }, 1000);
        }

        const qFiles = query(collection(db, "applications")); 
        unsubscribeFiles = onSnapshot(qFiles, (snapshot) => {
          const docs = snapshot.docs.map(doc => doc.data());
          const completed = docs.filter(f => f.status === "completed").length;
          const pending = docs.filter(f => f.status === "pending").length;
          const total = snapshot.size;
          setRealtimeStats({
            total: total, pending: pending, completed: completed,
            rate: total > 0 ? Math.round((completed / total) * 100) : 0
          });
        });
      }
    };

    fetchUserData();
    return () => { if (interval) clearInterval(interval); if (unsubscribeFiles) unsubscribeFiles(); };
  }, []);

  const handleSaveUniversity = async () => {
    if (!uniData.name || !uniData.country) return alert("Please fill Name and Country!");
    if (isOwner && !selectedClient) return alert("Please select a Client first!");
    
    try {
      await addDoc(collection(db, "universities"), {
        ...uniData,
        addedBy: auth.currentUser?.uid,
        ownerAdded: isOwner,
        targetClientId: isOwner ? selectedClient : auth.currentUser?.uid,
        createdAt: serverTimestamp(),
      });
      alert("University Added Successfully!");
      setUniData({ name: '', country: '', course: '', cgpa: '', language: '', details: '' });
    } catch (e) { console.error("Error: ", e); }
  };

  const stats = [
    { icon: Users, label: 'Active Students', value: realtimeStats.total.toString(), change: 'Live', color: 'from-teal-500 to-emerald-500' },
    { icon: FileText, label: 'Files in Process', value: realtimeStats.pending.toString(), change: 'Live', color: 'from-cyan-500 to-blue-500' },
    { icon: CheckCircle, label: 'Completed', value: realtimeStats.completed.toString(), change: 'Live', color: 'from-teal-500 to-cyan-500' },
    { icon: TrendingUp, label: 'Success Rate', value: `${realtimeStats.rate}%`, change: 'Live', color: 'from-emerald-500 to-teal-500' }
  ];

  const features = [
    { name: 'AI Assessment', icon: Zap }, { name: 'Cloud Manager', icon: Camera },
    { name: '20-Step Track', icon: BarChart }, { name: 'Mail Alerts', icon: Bell },
    { name: 'Smart Invoice', icon: FileText }, { name: 'Compliance Hub', icon: ShieldCheck },
    { name: 'Marketing Studio', icon: Globe }, { name: 'QR Tracking', icon: Database },
    { name: 'Ticketing System', icon: LayoutGrid }, { name: 'Priority Support', icon: MessageSquare },
    { name: 'Team Hub', icon: Briefcase }, { name: 'Agent Network', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] font-sans relative overflow-x-hidden text-slate-900">
      
      {/* FEATURE MODAL */}
      {activeFeature && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-teal-50/30">
              <h2 className="text-2xl font-black text-teal-900 uppercase italic tracking-tighter">{activeFeature}</h2>
              <button onClick={() => setActiveFeature(null)} className="p-3 hover:bg-white rounded-full text-slate-400 hover:text-rose-500 transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
                {activeFeature === 'AI Assessment' && <AIAssessor />}
                {activeFeature === 'Cloud Manager' && <CloudManager />}
                {activeFeature === '20-Step Track' && <TrackingSystem />}
                {activeFeature === 'Mail Alerts' && <MailAlerts />}
                {activeFeature === 'Smart Invoice' && <SmartInvoicing />}
                {activeFeature === 'Compliance Hub' && <Compliance />}
                {activeFeature === 'Marketing Studio' && <MarketingStudio />}
                {activeFeature === 'QR Tracking' && <QRTracking />}
                {activeFeature === 'Ticketing System' && <Ticketing />}
                {activeFeature === 'Priority Support' && <Support />}
                {activeFeature === 'Team Hub' && <EmployeeManagement />}
                {activeFeature === 'Agent Network' && <AgentHub />}
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-teal-50 sticky top-0 z-50 p-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
           <div className="flex items-center gap-4">
             {timeLeft && (
               <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${timeLeft === "Expired" ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-teal-50 border-teal-100 text-teal-700"}`}>
                 <Zap size={14} className={timeLeft !== "Expired" ? "animate-pulse" : ""} />
                 <span className="text-[10px] font-black uppercase tracking-widest italic">{timeLeft === "Expired" ? "Package Expired" : `${userPackage} ends: ${timeLeft}`}</span>
               </div>
             )}
             <button onClick={() => window.history.back()} className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full font-bold text-sm transition-all">
               <ArrowLeft className="w-4 h-4" /> Back
             </button>
           </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-10 space-y-12">
        <h1 className="text-4xl font-black text-teal-950 italic uppercase tracking-tighter underline decoration-teal-100 decoration-8 underline-offset-8">Client Dashboard</h1>

        {/* --- MAIN SECTION: ACTIVITY & QUICK ACTIONS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT COLUMN: RECENT STATUS UPDATES */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[3rem] border border-teal-50 shadow-xl overflow-hidden h-full">
              <div className="p-8 border-b border-teal-50 bg-teal-50/10 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#12B2A3] rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-100">
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="font-black text-xl italic text-teal-900 uppercase">Recent Status Updates</h3>
                  <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">Latest file activities</p>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between p-6 hover:bg-teal-50/30 transition-all border-b border-slate-50 last:border-0 rounded-[2rem] group">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#12B2A3] border border-teal-100 shadow-sm">
                      <FileText size={22} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-teal-950">
                        Md. Abu Omar <span className="font-medium text-slate-500">has submitted their file with</span> 12 documents
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">The file is now with the <span className="text-teal-600 font-black">COMPLIANCE TEAM</span> for review</p>
                      <div className="flex items-center gap-4 mt-4">
                        <span className="text-[9px] font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase italic">Received</span>
                        <button className="text-[10px] font-black text-teal-500 hover:text-teal-700 underline underline-offset-4 flex items-center gap-1">
                          CHECK DETAILS <ExternalLink size={10}/>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] font-black text-slate-300 uppercase italic tracking-tighter">Just Now</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: QUICK ACTIONS & AI ASSISTANT */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-xl">
              <h3 className="font-black text-lg italic text-teal-900 uppercase mb-6 flex items-center gap-2">
                <Zap className="text-teal-500" size={18} /> Quick Actions
              </h3>
              <div className="space-y-4">
                <button className="w-full py-4 bg-[#12B2A3] text-white rounded-2xl font-black italic uppercase text-xs hover:bg-[#0E9488] transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-100 tracking-tighter">
                  <Plus size={18} /> Add New Student
                </button>

                <div className="p-5 bg-slate-50 rounded-[2rem] border border-teal-50 space-y-3">
                  <p className="text-[10px] font-black text-teal-700 uppercase tracking-widest flex items-center gap-2 mb-2">
                    <GraduationCap size={14} /> University Entry
                  </p>
                  
                  {isOwner && (
                    <select value={selectedClient} onChange={(e)=>setSelectedClient(e.target.value)} className="w-full p-3 bg-white rounded-xl text-[10px] font-bold border border-teal-100 outline-none">
                      <option value="">-- Assign to Client --</option>
                      <option value="c1">Md. Abu Omar</option>
                    </select>
                  )}
                  
                  <input 
                    type="text" 
                    placeholder="University Name" 
                    value={uniData.name}
                    onChange={(e)=>setUniData({...uniData, name: e.target.value})}
                    className="w-full p-3 bg-white rounded-xl text-[10px] font-bold outline-none border border-teal-50 focus:border-teal-400" 
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      value={uniData.country}
                      onChange={(e)=>setUniData({...uniData, country: e.target.value})}
                      className="p-3 bg-white rounded-xl text-[10px] font-bold outline-none border border-teal-50 focus:border-teal-400"
                    >
                      <option>Country</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input 
                      type="text" 
                      placeholder="Course" 
                      value={uniData.course}
                      onChange={(e)=>setUniData({...uniData, course: e.target.value})}
                      className="p-3 bg-white rounded-xl text-[10px] font-bold outline-none border border-teal-50 focus:border-teal-400" 
                    />
                  </div>
                  
                  <button onClick={handleSaveUniversity} className="w-full py-3 bg-white text-[#12B2A3] border border-[#12B2A3] rounded-xl font-black text-[10px] hover:bg-teal-50 transition-all uppercase italic tracking-tighter">
                    Quick Save
                  </button>
                </div>

                <button onClick={() => setActiveFeature('Cloud Manager')} className="w-full py-4 bg-white text-slate-500 border border-slate-200 rounded-2xl font-black italic uppercase text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 tracking-tighter">
                  <Upload size={18} /> Documents
                </button>
              </div>
            </div>

            <div className="bg-[#12B2A3] p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                   <div className="p-2 bg-white/20 rounded-lg text-white"><Zap size={16} fill="white" /></div>
                   <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">AI Assistant</h3>
                </div>
                <p className="text-teal-50 text-[11px] mb-6 leading-relaxed font-bold uppercase italic opacity-80">Get instant student assessment help.</p>
                <button className="w-full py-4 bg-white text-[#12B2A3] rounded-2xl font-black italic uppercase text-xs hover:bg-teal-50 transition-all shadow-md flex items-center justify-center gap-2">
                  Launch <Send size={16} />
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-[2rem] border border-teal-50 p-6 hover:shadow-xl transition-all flex items-center gap-5 group min-h-[140px]">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0`}><stat.icon className="w-7 h-7 text-white" /></div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{stat.change}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-teal-950 tracking-tighter leading-tight">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* B2B SERVICE SUITE */}
        <div className="space-y-10 pb-20">
          <div className="flex items-center gap-4">
            <div className="h-8 w-2 bg-teal-500 rounded-full"></div>
            <h3 className="font-black text-3xl italic text-teal-900 uppercase tracking-tighter">B2B Service Suite</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((f, i) => {
              const isAvailable = hasAccess(userPackage, f.name);
              return (
                <div key={i} onClick={() => isAvailable ? setActiveFeature(f.name) : alert(`Locked in ${userPackage} plan.`)} 
                  className={`bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer relative ${!isAvailable ? 'opacity-50 grayscale bg-slate-50' : 'hover:border-teal-300 hover:-translate-y-2'}`}>
                  {!isAvailable && <div className="absolute top-5 right-6 text-amber-600"><Lock size={14} /></div>}
                  <div className={`mb-6 p-5 rounded-2xl ${isAvailable ? 'bg-teal-50 text-teal-500 group-hover:bg-teal-500 group-hover:text-white' : 'bg-slate-200 text-slate-400'}`}><f.icon size={28} /></div>
                  <h3 className="font-black text-[13px] mb-1 italic uppercase tracking-tight">{f.name}</h3>
                  <span className="text-[9px] font-black uppercase italic text-teal-400">{isAvailable ? 'Live Sync' : 'Locked'}</span>
                </div>
              )
            })}
          </div> 
        </div>
      </div> 
    </div>
  );
}