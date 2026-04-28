"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, FileText, CheckCircle, TrendingUp, ArrowLeft, GraduationCap, 
  Plus, Upload, BarChart, Zap, Camera, Bell, ShieldCheck, 
  Globe, Database, MessageSquare, X, ExternalLink, Lock, Briefcase, LayoutGrid
} from 'lucide-react';
import { auth, db } from '../lib/firebase'; 
import { doc, getDoc } from 'firebase/firestore';

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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const plan = userData.package?.toLowerCase().trim() || 'starter';
          setUserPackage(plan);

          const registrationTime = userData.createdAt?.seconds 
            ? userData.createdAt.toMillis() 
            : Date.now();
          
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
              
              if (planType === 'trial') {
                 setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
              } else {
                 setTimeLeft(`${days}d ${hours}h`);
              }
            }
          }, 1000);
        }
      }
    };

    fetchUserData();
    return () => { if(interval) clearInterval(interval); };
  }, []);

  const stats = [
    { icon: Users, label: 'Active Students', value: '245', change: '+12%', color: 'from-teal-500 to-emerald-500' },
    { icon: FileText, label: 'Files in Process', value: '89', change: '+5%', color: 'from-cyan-500 to-blue-500' },
    { icon: CheckCircle, label: 'Completed', value: '156', change: '+18%', color: 'from-teal-500 to-cyan-500' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%', change: '+3%', color: 'from-emerald-500 to-teal-500' }
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
                <div className="text-2xl sm:text-3xl font-black text-teal-950 tracking-tighter leading-tight">
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
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
                <div 
                  key={i} 
                  onClick={() => {
                    if (isAvailable) {
                      setActiveFeature(f.name);
                    } else {
                      alert(`🔒 This feature is locked in the ${userPackage.toUpperCase()} plan. \n\nPlease upgrade to Professional or Enterprise to unlock "${f.name}".`);
                    }
                  }} 
                  className={`bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-xl shadow-teal-900/5 transition-all flex flex-col items-center text-center group cursor-pointer relative ${
                    !isAvailable 
                      ? 'opacity-50 grayscale cursor-not-allowed bg-slate-50' 
                      : 'hover:border-teal-300 hover:-translate-y-2 hover:shadow-teal-200/20'
                  }`}
                >
                  {!isAvailable && (
                    <div className="absolute top-5 right-6 bg-amber-100 p-1.5 rounded-full text-amber-600 shadow-sm">
                      <Lock size={14} strokeWidth={3} />
                    </div>
                  )}
                  <div className={`mb-6 p-5 rounded-2xl transition-all shadow-sm ${
                    isAvailable ? 'bg-teal-50 text-teal-500 group-hover:bg-teal-500 group-hover:text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <f.icon size={28} />
                  </div>
                  <h3 className={`font-black text-[13px] mb-1 italic uppercase tracking-tight ${isAvailable ? 'text-teal-900' : 'text-slate-500'}`}>
                    {f.name}
                  </h3>
                  <div className="flex items-center gap-1.5 justify-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                    <span className={`text-[9px] font-black uppercase tracking-widest italic ${isAvailable ? 'text-teal-400' : 'text-slate-400'}`}>
                      {isAvailable ? 'Live Sync' : 'Locked'}
                    </span>
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