import React from 'react';
import { Bell } from 'lucide-react';

// "export function" use kora hoyeche jate Dashboard properly import korte pare
export function MailAlerts() {
  return (
    <div className="w-full max-w-md mx-auto text-center py-6">
      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
        <Bell size={40} />
      </div>
      
      <h3 className="text-2xl font-black text-slate-800 mb-3 italic uppercase tracking-tighter">
        Smart Mail Alerts
      </h3>
      
      <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed italic">
        Compliance team status update korlei student ebong partner-er kache auto mail jabe.
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm">
           <span className="text-sm font-black text-slate-600 uppercase tracking-tight">Active Notifications</span>
           {/* Custom Toggle UI */}
           <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
           </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm opacity-60">
           <span className="text-sm font-black text-slate-600 uppercase tracking-tight">Partner Copy CC</span>
           <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
           </div>
        </div>
      </div>

      <div className="mt-10 p-4 bg-teal-50 rounded-2xl border border-teal-100">
        <p className="text-[10px] font-bold text-teal-700 uppercase tracking-widest">
          Status: Automation Engine is Live
        </p>
      </div>
    </div>
  );
}