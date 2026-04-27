"use client";
import React from 'react';
import { Send, Headset, MessageSquare, Sparkles } from 'lucide-react';

// "export function" use kora hoyeche jate Dashboard properly import korte pare
export function Support() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col h-[550px] bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      
      {/* Support Header */}
      <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
           <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
              <Headset size={28} />
           </div>
           <div>
              <h3 className="font-black text-xl italic uppercase tracking-tighter leading-none">Priority Support</h3>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">Response time: ~5 mins</p>
           </div>
        </div>
        <Sparkles className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white/10" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-8 bg-slate-50/50 overflow-y-auto flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
           <MessageSquare size={24} className="text-teal-500" />
        </div>
        <div>
           <p className="text-sm font-black text-slate-800 italic uppercase tracking-tight">How can we help today?</p>
           <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-[200px] mx-auto mt-2 italic">
             Start a conversation with our relationship manager regarding your agency files.
           </p>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100 flex gap-3 items-center">
         <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Describe your issue..." 
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-6 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-teal-500 transition-all" 
            />
         </div>
         <button className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-2xl shadow-lg shadow-teal-100 transition-all active:scale-95">
            <Send size={20} />
         </button>
      </div>

      <div className="pb-4 bg-white text-center">
         <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">EduStream 24/7 Concierge</span>
      </div>
    </div>
  );
}