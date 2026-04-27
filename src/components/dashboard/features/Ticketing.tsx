import React from 'react';
import { Ticket, Send, History, AlertCircle } from 'lucide-react';

// "export function" use koro jate Dashboard-er logic-er shathe match hoy
export function Ticketing() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Ticketing Header */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Ticket size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter leading-none">Support Ticket</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Official Query Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">3 Active Tickets</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-7 space-y-4">
           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 italic">New Issue Description</label>
           <textarea 
              placeholder="Describe your issue in detail (e.g., Application delay, Document error)..."
              className="w-full h-48 bg-slate-50 border-2 border-slate-50 rounded-[2rem] p-6 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-slate-700"
           />
           <button className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-5 rounded-[1.8rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95">
              <Send size={16} /> Submit Official Ticket
           </button>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-5 space-y-4">
           <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-[2rem]">
              <div className="flex items-center gap-2 mb-3">
                 <AlertCircle size={16} className="text-amber-500" />
                 <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Pro-Tip</span>
              </div>
              <p className="text-[11px] text-amber-800 font-medium leading-relaxed italic">
                Urgently response dorkar hole student-er passport number ticket-er bhitore mention koro.
              </p>
           </div>

           <button className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[1.8rem] hover:bg-slate-50 transition-all group">
              <div className="flex items-center gap-3">
                 <History size={18} className="text-slate-400 group-hover:text-emerald-500" />
                 <span className="text-xs font-black text-slate-600 uppercase italic tracking-tight">View History</span>
              </div>
              <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-black text-slate-500">
                 12
              </div>
           </button>
        </div>
      </div>
    </div>
  );
}