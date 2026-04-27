"use client";
import React, { useState } from 'react';
import { 
  Users, FileText, CheckCircle, TrendingUp, ArrowLeft, GraduationCap, 
  Plus, Upload, BarChart, Zap, Camera, Bell, ShieldCheck, 
  Globe, Database, MessageSquare, X, ExternalLink 
} from 'lucide-react';

// --- FEATURE IMPORTS ---
import { hasAccess, PackageTier } from "../config/permissions"; // Path-ta check kore niyo
import { Lock } from 'lucide-react'; // Lock icon-ta dorkar hobe
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

export default function ClientDashboard() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  // Manual package state (Testing-er jonno 'starter', 'pro' ba 'enterprise' likhe check koro)
  const [userPackage, setUserPackage] = useState<PackageTier>('starter');
  const [submissions] = useState([
    { id: 1, name: "Arif Ahmed", passport: "BE098712", status: "IN REVIEW", url: "https://res.cloudinary.com/demo/image/upload/v1/samples/sample.pdf" },
    { id: 2, name: "Sumaiya Khan", passport: "BW002145", status: "PROCESSING", url: "https://res.cloudinary.com/demo/image/upload/v1/samples/sample.pdf" },
    { id: 3, name: "Tanvir Hasan", passport: "BP055432", status: "COMPLIANCE", url: "https://res.cloudinary.com/demo/image/upload/v1/samples/sample.pdf" }
  ]);

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
    { name: 'Priority Support', icon: MessageSquare }, // Ekhane comma (,) thakte hobe
    { name: 'Team Hub', icon: Users },
    { name: 'Agent Network', icon: Users } // Duplicate AI Assessment muche eita rakho
    
  ];

  // Helper function to open Cloudinary PDF
  const openPdf = (url: string) => {
    window.open(url, '_blank');
  };

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
    <div className="min-h-screen bg-[#F8FAF9] font-sans relative">
      
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
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black italic text-teal-900 uppercase tracking-tighter block leading-none">EduStream</span>
              <span className="text-[10px] font-bold text-teal-500 uppercase tracking-widest italic">B2B Partner Portal</span>
            </div>
          </div>
          <button onClick={() => window.history.back()} className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full font-bold text-sm transition-all">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-10 space-y-12">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-black text-teal-950 italic uppercase tracking-tighter underline decoration-teal-100 decoration-8 underline-offset-8">Client Dashboard</h1>
        </div>

        {/* STATS SECTION - Optimized Size */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
  {stats.map((stat, index) => (
    <div key={index} className="bg-white rounded-[2rem] border border-teal-50 p-6 hover:shadow-xl transition-all flex items-center gap-5 group min-h-[140px]">
      {/* Icon Container - Fixed size jate choto screen-e boro na hoy */}
      <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0`}>
        <stat.icon className="w-7 h-7 text-white" />
      </div>
      
      {/* Text Content - Responsive font sizes */}
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

       {/* LIVE STATUS & QUICK ACTIONS */}
<div className="grid lg:grid-cols-12 gap-10">
  
  {/* Requirement: Student name dynamic notification & Clickable PDF link */}
  <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 border border-teal-50 shadow-sm flex flex-col min-h-[500px]">
    <h2 className="text-2xl font-black text-teal-900 italic uppercase mb-8 border-l-4 border-teal-500 pl-4">Live Submission Status</h2>
    
    <div className="space-y-4 flex-1">
      {submissions.map((sub) => (
        <div key={sub.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-transparent hover:border-teal-200 transition-all group overflow-hidden">
          
          <div className="flex items-center gap-6 overflow-hidden flex-1 mr-4">
            {/* Icon - Shrink-0 jate choto na hoy */}
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 font-black shadow-sm group-hover:bg-teal-500 group-hover:text-white transition-all shrink-0">
              S
            </div>
            
            {/* Text Content - Truncate add kora hoyeche jate bitor thake */}
            <div className="min-w-0 flex-1">
              <h4 className="font-black text-slate-800 uppercase italic truncate text-sm sm:text-base">
                File Submitted: {sub.name}
              </h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">
                Passport: <span className="text-teal-600">{sub.passport}</span> • Status: <span className="text-teal-600">{sub.status}</span>
              </p>
            </div>
          </div>

          {/* Button - Shrink-0 jate thik thake */}
          <button 
            onClick={() => openPdf(sub.url)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-teal-700 rounded-xl font-black text-[10px] uppercase border border-slate-100 hover:bg-teal-600 hover:text-white transition-all shadow-sm shrink-0"
          >
            <ExternalLink size={14} /> Click Here
          </button>
          
        </div>
      ))}
    </div>
  </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[3rem] border border-teal-50 p-10 shadow-sm">
              <h3 className="text-xl font-black text-teal-900 uppercase italic mb-6">Quick Operations</h3>
              <div className="space-y-4">
                {/* Requirement: Add student and upload logic triggers features */}
                <button 
                  onClick={() => setActiveFeature('Ticketing System')}
                  className="w-full flex items-center gap-4 p-5 bg-teal-500 hover:bg-teal-600 text-white rounded-[1.8rem] font-black text-sm uppercase transition-all shadow-xl shadow-teal-100"
                >
                  <Plus size={20} /> Add New Student
                </button>
                <button 
                  onClick={() => setActiveFeature('Cloud Manager')}
                  className="w-full flex items-center gap-4 p-5 border-2 border-teal-50 text-teal-700 hover:bg-teal-50 rounded-[1.8rem] font-black text-sm uppercase transition-all"
                >
                  <Upload size={20} /> Upload Documents
                </button>
              </div>
            </div>

            {/* AI Assistant Card */}
            <div onClick={() => setActiveFeature('AI Assessment')} className="bg-[#0A192F] rounded-[3rem] p-10 text-white relative overflow-hidden group min-h-[320px] flex flex-col justify-center cursor-pointer shadow-2xl hover:scale-[1.02] transition-all">
              <Zap className="text-teal-400 mb-6 group-hover:animate-pulse" size={48} fill="currentColor" />
              <h3 className="text-3xl font-black italic uppercase leading-none mb-4 tracking-tighter">AI Eligibility<br/><span className="text-teal-500">Assistant</span></h3>
              <div className="inline-flex px-6 py-3 bg-teal-500/10 border border-teal-500/50 text-teal-400 rounded-full text-[10px] font-black uppercase tracking-widest w-fit">Launch Engine</div>
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
              {features.map((f, i) => {
  // Check if the current user has access to this specific feature
  const isAvailable = hasAccess(userPackage, f.name);

  return (
    <div 
      key={i} 
      onClick={() => {
        if (isAvailable) {
          setActiveFeature(f.name);
        } else {
          // Alert message for locked features
          alert(`🔒 This feature is locked in the ${userPackage.toUpperCase()} plan. \n\nPlease upgrade to Professional or Enterprise to unlock "${f.name}".`);
        }
      }} 
      className={`bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-xl shadow-teal-900/5 transition-all flex flex-col items-center text-center group cursor-pointer relative ${
        !isAvailable 
          ? 'opacity-50 grayscale cursor-not-allowed bg-slate-50' 
          : 'hover:border-teal-300 hover:-translate-y-2 hover:shadow-teal-200/20'
      }`}
    >
      {/* Lock Icon Badge for Restricted Features */}
      {!isAvailable && (
        <div className="absolute top-5 right-6 bg-amber-100 p-1.5 rounded-full text-amber-600 shadow-sm">
          <Lock size={14} strokeWidth={3} />
        </div>
      )}

      {/* Feature Icon Container */}
      <div className={`mb-6 p-5 rounded-2xl transition-all shadow-sm ${
        isAvailable 
          ? 'bg-teal-50 text-teal-500 group-hover:bg-teal-500 group-hover:text-white' 
          : 'bg-slate-200 text-slate-400'
      }`}>
        <f.icon size={28} />
      </div>

      {/* Feature Name */}
      <h3 className={`font-black text-[13px] mb-1 italic uppercase tracking-tight ${
        isAvailable ? 'text-teal-900' : 'text-slate-500'
      }`}>
        {f.name}
      </h3>
      
      {/* Status Indicator */}
      <div className="flex items-center gap-1.5 justify-center">
        <div className={`w-1.5 h-1.5 rounded-full ${
          isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
        }`}></div>
        <span className={`text-[9px] font-black uppercase tracking-widest italic ${
          isAvailable ? 'text-teal-400' : 'text-slate-400'
        }`}>
          {isAvailable ? 'Live Sync' : 'Locked'}
        </span>
      </div>
    </div>
  );
})}