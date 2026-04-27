import React, { useState } from 'react';
import { 
  Users, FileText, CheckCircle, TrendingUp, ArrowLeft, GraduationCap, 
  Plus, Upload, BarChart, Zap, Camera, Bell, ShieldCheck, 
  Globe, Database, MessageSquare, X 
} from 'lucide-react';
import jsPDF from 'jspdf';

// IMPORTANT: Path correction matched with your folder screenshot
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

import { RecentStatusNotifications } from "./RecentStatusNotifications";

export function ClientDashboard() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

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
    { name: 'Ticketing System', icon: Users },
    { name: 'Priority Support', icon: MessageSquare }
  ];

  // Logic matched with your actual file names
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
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] font-sans relative">
      
      {/* FEATURE MODAL OVERLAY */}
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
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-100 shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black italic text-teal-900 uppercase tracking-tighter block leading-none">EduStream</span>
              <span className="text-[10px] font-bold text-teal-500 uppercase tracking-widest italic">B2B Partner Portal</span>
            </div>
          </div>
          <button onClick={() => window.history.back()} className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full font-bold text-sm transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-10 space-y-12">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-black text-teal-950 italic uppercase tracking-tighter">Client Dashboard</h1>
          <p className="text-teal-600 font-medium italic mt-2 underline decoration-teal-100 decoration-4 italic">Bangladesh B2B Agency Operations</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-[2.5rem] border border-teal-50 p-8 hover:shadow-2xl hover:shadow-teal-900/5 transition-all flex flex-row items-center gap-8 group">
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-[1.5rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                 <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.change}</span>
                 </div>
                 <div className="text-4xl font-black text-teal-950 tracking-tighter">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 border border-teal-50 shadow-sm flex flex-col min-h-[500px]">
            <h2 className="text-2xl font-black text-teal-900 italic uppercase mb-8 tracking-tighter border-l-4 border-teal-500 pl-4">Live Submission Status</h2>
            <RecentStatusNotifications />
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[3rem] border border-teal-50 p-10 shadow-sm">
              <h3 className="text-xl font-black text-teal-900 uppercase italic mb-6 tracking-tighter">Quick Operations</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-4 p-5 bg-teal-500 hover:bg-teal-600 text-white rounded-[1.8rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-teal-100">
                  <Plus size={20} /> Add New Student
                </button>
                <button className="w-full flex items-center gap-4 p-5 border-2 border-teal-50 text-teal-700 hover:bg-teal-50 rounded-[1.8rem] font-black text-sm uppercase tracking-widest transition-all">
                  <Upload size={20} /> Upload Documents
                </button>
              </div>
            </div>

            <div onClick={() => setActiveFeature('AI Assessment')} className="bg-[#0A192F] rounded-[3rem] p-10 text-white relative overflow-hidden group min-h-[320px] flex flex-col justify-center cursor-pointer shadow-2xl hover:scale-[1.02] transition-all">
              <div className="relative z-10">
                <Zap className="text-teal-400 mb-6 group-hover:animate-pulse" size={48} fill="currentColor" />
                <h3 className="text-3xl font-black italic uppercase leading-none mb-4 tracking-tighter">AI Eligibility<br/><span className="text-teal-500">Assistant</span></h3>
                <div className="inline-flex px-6 py-3 bg-teal-500/10 border border-teal-500/50 text-teal-400 rounded-full text-[10px] font-black uppercase tracking-widest">Launch Engine</div>
              </div>
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* 10 FEATURES GRID */}
        <div className="space-y-10 pb-20">
            <div className="flex items-center gap-4">
              <div className="h-8 w-2 bg-teal-500 rounded-full"></div>
              <h3 className="font-black text-3xl italic text-teal-900 uppercase tracking-tighter">Partner B2B Service Suite</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {features.map((f, i) => (
                <div key={i} onClick={() => setActiveFeature(f.name)} className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-xl shadow-teal-900/5 hover:border-teal-300 hover:-translate-y-2 transition-all flex flex-col items-center text-center group cursor-pointer">
                  <div className="mb-6 p-5 bg-teal-50 text-teal-500 rounded-2xl group-hover:bg-teal-500 group-hover:text-white transition-all shadow-sm">
                    <f.icon size={28} />
                  </div>
                  <h3 className="font-black text-[13px] text-teal-900 mb-1 italic uppercase tracking-tight">{f.name}</h3>
                  <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest italic animate-pulse">Live Sync</span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}