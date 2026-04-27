import React from 'react';
import { BarChart3, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

// "export function" use kora hoyeche jate Dashboard-er import line-er shathe match hoy
export function TrackingSystem() {
  const steps = [
    { title: "File Received", status: "completed", date: "12 March 2026" },
    { title: "Compliance Check", status: "completed", date: "15 March 2026" },
    { title: "University Applied", status: "current", date: "Processing" },
    { title: "Offer Letter", status: "pending", date: "Waiting" },
    { title: "Visa Lodged", status: "pending", date: "Locked" }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10 py-4">
      {/* Tracker Header */}
      <div className="flex items-center justify-between bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-cyan-50 text-cyan-600 rounded-2xl">
            <BarChart3 size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter leading-none">20-Step Tracker</h3>
            <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-[0.2em] mt-1">Live Processing Pipeline</p>
          </div>
        </div>
        <div className="text-right">
           <p className="text-2xl font-black text-slate-900 tracking-tighter">40%</p>
           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Overall Progress</p>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="relative pl-8 space-y-0">
        {/* The Vertical Line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

        {steps.map((s, i) => (
          <div key={i} className="relative flex gap-8 pb-10 group">
            {/* Timeline Icon/Dot */}
            <div className="relative z-10">
              {s.status === 'completed' ? (
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-100">
                  <CheckCircle2 size={14} />
                </div>
              ) : s.status === 'current' ? (
                <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center animate-pulse shadow-lg shadow-cyan-100">
                  <Circle size={10} fill="currentColor" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 text-slate-200 flex items-center justify-center">
                  <Circle size={10} />
                </div>
              )}
            </div>

            {/* Step Content */}
            <div className={`flex-1 p-6 rounded-[2rem] border transition-all ${
              s.status === 'current' 
                ? 'bg-cyan-50/50 border-cyan-100' 
                : s.status === 'completed'
                ? 'bg-white border-slate-50'
                : 'bg-white border-transparent opacity-50'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <p className={`text-sm font-black uppercase italic tracking-tight ${
                  s.status === 'pending' ? 'text-slate-400' : 'text-slate-800'
                }`}>
                  {s.title}
                </p>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.date}</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Step {i + 1} of 20</p>
              
              {s.status === 'current' && (
                <div className="mt-4 flex items-center gap-2 text-cyan-600">
                   <span className="text-[10px] font-black uppercase italic">In Review by Compliance</span>
                   <ArrowRight size={12} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}