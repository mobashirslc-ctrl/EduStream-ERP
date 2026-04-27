import React from 'react';
import { Users, X, ShieldCheck, Clock } from 'lucide-react';

const Compliance = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black flex items-center gap-2"><ShieldCheck className="text-emerald-500" /> Compliance Desk</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-6">
          <p className="text-xs text-amber-700 font-bold flex items-center gap-2"><Clock size={14}/> System is checking uploaded documents for validity...</p>
        </div>
        <div className="space-y-3">
          {["Identity Verification", "Academic Verification", "Background Check"].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-sm font-bold text-slate-700">{item}</span>
              <span className="text-[10px] bg-slate-200 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Pending</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Compliance;