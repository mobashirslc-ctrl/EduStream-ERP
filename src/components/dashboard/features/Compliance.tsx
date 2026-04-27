import React from 'react';
import { ShieldCheck, Clock } from 'lucide-react';

// "export function" use kora hoyeche jate Dashboard properly import korte pare
export function Compliance() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-emerald-500/10 p-6 rounded-[2rem] flex items-center gap-4 border border-emerald-100">
        <div className="bg-emerald-500 p-3 rounded-xl text-white">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 className="font-black text-emerald-900 uppercase italic tracking-tighter">Compliance Hub</h3>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest italic">Quality Assurance Unit</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-5 rounded-[1.5rem] animate-pulse">
        <p className="text-xs text-amber-700 font-black uppercase tracking-tight flex items-center gap-2">
          <Clock size={16} className="text-amber-500"/> System is checking documents for validity...
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {["Identity Verification", "Academic Verification", "Background Check"].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-teal-200 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-slate-300 rounded-full group-hover:bg-teal-500 transition-colors"></div>
              <span className="text-sm font-black text-slate-700 italic uppercase tracking-tighter">{item}</span>
            </div>
            <span className="text-[9px] bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full font-black uppercase tracking-widest italic">
              Pending Review
            </span>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          All documents are encrypted and secure
        </p>
      </div>
    </div>
  );
}