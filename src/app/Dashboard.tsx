"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, FileText, CheckCircle, TrendingUp, ArrowLeft, GraduationCap, 
  Plus, Upload, BarChart, Zap, Camera, Bell, ShieldCheck, 
  Globe, Database, MessageSquare, X, ExternalLink, Lock, Briefcase, LayoutGrid, Send
} from 'lucide-react';
import { auth, db } from '../lib/firebase'; 
import { doc, getDoc, collection, query, onSnapshot } from 'firebase/firestore';

// --- FEATURE COMPONENTS ---
import { AIAssessment } from "../components/dashboard/features/AIAssessment";
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
  const [realtimeStats, setRealtimeStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    rate: 0
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let unsubscribeFiles: () => void;

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
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
            total: total,
            pending: pending,
            completed: completed,
            rate: total > 0 ? Math.round((completed / total) * 100) : 0
          });
        });
      }
    };

    fetchUserData();
    return () => { if (interval) clearInterval(interval); if (unsubscribeFiles) unsubscribeFiles(); };
  }, []);

  const stats = [
    { icon: Users, label: 'Active Students', value: realtimeStats.total.toString(), change: 'Live', color: 'from-teal-500 to-emerald-500' },
    { icon: FileText, label: 'Files in Process', value: realtimeStats.pending.toString(), change: 'Live', color: 'from-cyan-500 to-blue-500' },
    { icon: CheckCircle, label: 'Completed', value: realtimeStats.completed.toString(), change: 'Live', color: 'from-teal-500 to-cyan-500' },
    { icon: TrendingUp, label: 'Success Rate', value: `${realtimeStats.rate}%`, change: 'Live', color: 'from-emerald-500 to-teal-500' }
  ];

  const features = [
    { name: 'AI Assessment', icon: Zap },
    { name: 'Cloud Manager', icon: Camera },
    { name: '20-Step Track', icon: BarChart },
    { name: 'Mail Alerts', icon: Bell },
    { name: 'Smart Invoice', icon: FileText },
    { name: 'Compliance Hub', icon: ShieldCheck },
    { name: 'Marketing Studio', icon: Globe },
    { name: 'QR Tracking', icon: Database },
    { name: 'Ticketing System', icon: LayoutGrid },
    { name: 'Priority Support', icon: MessageSquare },
    { name: 'Team Hub', icon: Briefcase },
    { name: 'Agent Network', icon: Globe },
  ];

  const renderFeatureComponent = () => {
    switch (activeFeature) {
      case 'AI Assessment': return <AIAssessment />;
      case 'Cloud Manager': return <CloudManager />;
      case '20-Step Track': return <TrackingSystem />; 
      case 'Mail Alerts': return <MailAlerts />;
      case 'Smart Invoice': return <SmartInvoicing />;
      case 'Compliance Hub': return <Compliance />;
      case 'Marketing Studio': return <MarketingStudio />;
      case 'QR Tracking': return <QRTracking />;
      case 'Ticketing System': return <Ticketing />;
      case 'Priority Support': return <Support />;
      case 'Team Hub': return <EmployeeManagement />;
      case 'Agent Network': return <AgentHub />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] font-sans relative overflow-x-hidden">
      
      {/* FEATURE MODAL */}
      {activeFeature && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-teal-50/30">
              <h2 className="text-2xl font-black text-teal-900 uppercase italic tracking-tighter">{activeFeature}</h2>
              <button onClick={() => setActiveFeature(null)} className="p-3 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-rose-500">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
              {renderFeatureComponent()}
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
                <span className="text-[10px] font-black uppercase tracking-widest italic">
                  {timeLeft === "Expired" ? "Package Expired" : `${userPackage} ends in: ${timeLeft}`}
                </span>
              </div>
            )}
            <button onClick={() => window.history.back()} className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full font-bold text-sm transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-10 space-y-12">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-black text-teal-950 italic uppercase tracking-tighter underline decoration-teal-100 decoration-8 underline-offset-8">Client Dashboard</h1>
        </div>

        {/* --- SECTION: QUICK ACTIONS & AI COUNSELOR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-xl space-y-6">
            <div>
              <h3 className="font-black text-lg italic text-teal-900 uppercase mb-4 flex items-center gap-2">
                <Plus className="text-teal-500" /> Quick Submit
              </h3>
              <div className="p-6 border-2 border-dashed border-teal-100 rounded-[2rem] bg-teal-50/30 flex flex-col items-center justify-center group hover:border-teal-400 transition-all cursor-pointer text-center">
                <Upload className="text-teal-400 group-hover:scale-110 transition-transform mb-2" />
                <span className="text-[10px] font-black uppercase text-teal-600">Submit Student File</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-50">
              <h3 className="font-black text-lg italic text-teal-900 uppercase mb-4 flex items-center gap-2">
                <Globe className="text-teal-500" size={18} /> University List
              </h3>
              <select className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-600 text-xs focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer">
                <option>Select Country Wise List...</option>
                <option>United Kingdom (UK)</option>
                <option>United States (USA)</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-teal-950 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <MessageSquare className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-xl italic text-white uppercase leading-none tracking-tighter">AI Business Counselor</h3>
                  <span className="text-[9px] text-teal-400 font-bold uppercase tracking-[0.2em]">Ready for Student Assessment</span>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 text-teal-100/90 text-sm font-medium border border-white/10 min-h-[120px]">
                Hello! You can input student details here for an instant assessment or counseling advice.
              </div>
            </div>
            <div className="mt-6 flex gap-3 relative z-10">
              <input type="text" placeholder="Type student details for counseling..." className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/30 outline-none focus:bg-white/20 transition-all text-sm" />
              <button className="w-14 h-14 bg-teal-500 hover:bg-teal-400 text-white rounded-full flex items-center justify-center transition-all shadow-lg shadow-teal-500/20 shrink-0">
                <Send size={20} />
              </button>
            </div>
            <div className="absolute -right-10 -top-10 opacity-10"><Zap size={300} /></div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-[2rem] border border-teal-50 p-6 hover:shadow-xl transition-all flex items-center gap-5 group min-h-[140px]">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{stat.label}</span>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full shrink-0">{stat.change}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-teal-950 tracking-tighter leading-tight">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* --- SECTION: RECENT FILE UPDATES --- */}
        <div className="bg-white rounded-[3rem] border border-teal-50 shadow-xl overflow-hidden mb-12">
          <div className="p-8 border-b border-teal-50 bg-teal-50/10 flex items-center justify-between">
            <h3 className="font-black text-xl italic text-teal-900 uppercase flex items-center gap-2">
              <Bell className="text-teal-500" size={20} /> Recent File Activity
            </h3>
          </div>
          <div className="p-8 space-y-4">
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl hover:bg-teal-50/50 transition-colors group border border-transparent hover:border-teal-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-teal-600 font-black text-xs uppercase border border-teal-50">MA</div>
                <div>
                  <p className="text-sm font-bold text-teal-950">
                    Md. Abu Omar-er file submit korechen, file ti ekhon <span className="text-teal-600 font-black px-2 bg-teal-50 rounded-lg">COMPLIANCE TEAM</span>-e received hoyeche.
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">Status: <span className="text-emerald-500 font-black">Received</span></span>
                    <span className="text-slate-200">|</span>
                    <button className="text-[10px] font-black uppercase text-teal-500 hover:text-teal-700 transition-all flex items-center gap-1 group/btn">
                      Details <span className="italic underline decoration-2">"Click Here"</span> <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block text-[9px] font-black text-slate-300 uppercase italic tracking-widest">Just Now</div>
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="space-y-10 pb-20">
          <div className="flex items-center gap-4">
            <div className="h-8 w-2 bg-teal-500 rounded-full"></div>
            <h3 className="font-black text-3xl italic text-teal-900 uppercase tracking-tighter">Partner B2B Service Suite</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((f, i) => {
              const isAvailable = hasAccess(userPackage, f.name);
              return (
                <div key={i} onClick={() => isAvailable ? setActiveFeature(f.name) : alert(`🔒 Locked in ${userPackage} plan.`)} 
                  className={`bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer relative ${!isAvailable ? 'opacity-50 grayscale cursor-not-allowed bg-slate-50' : 'hover:border-teal-300 hover:-translate-y-2'}`}>
                  {!isAvailable && <div className="absolute top-5 right-6 bg-amber-100 p-1.5 rounded-full text-amber-600"><Lock size={14} /></div>}
                  <div className={`mb-6 p-5 rounded-2xl transition-all ${isAvailable ? 'bg-teal-50 text-teal-500 group-hover:bg-teal-500 group-hover:text-white' : 'bg-slate-200 text-slate-400'}`}><f.icon size={28} /></div>
                  <h3 className={`font-black text-[13px] mb-1 italic uppercase tracking-tight ${isAvailable ? 'text-teal-900' : 'text-slate-500'}`}>{f.name}</h3>
                  <div className="flex items-center gap-1.5 justify-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                    <span className={`text-[9px] font-black uppercase tracking-widest italic ${isAvailable ? 'text-teal-400' : 'text-slate-400'}`}>{isAvailable ? 'Live Sync' : 'Locked'}</span>
                  </div>
                </div>
              )
            })}
          </div> 
        </div>
      </div> 
    </div>
  );
}