import React from 'react';
import { Globe, X, Layout, Megaphone } from 'lucide-react';

const MarketingStudio = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6 text-slate-800">
          <h3 className="text-xl font-black flex items-center gap-2"><Megaphone className="text-emerald-500" /> Agency Marketing</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["Visa Poster", "Scholarship Flyer", "Facebook Ad Copy", "Email Campaign"].map((item, i) => (
            <button key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-emerald-50 hover:border-emerald-200 transition-all text-center">
              <Layout className="mx-auto mb-2 text-slate-400" />
              <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">{item}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MarketingStudio;