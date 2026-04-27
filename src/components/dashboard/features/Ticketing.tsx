import React from 'react';
import { ShieldCheck, X, Ticket, MessageCircle } from 'lucide-react';

const Ticketing = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black flex items-center gap-2 text-slate-800"><Ticket className="text-emerald-500" /> Support Ticket</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <textarea 
           placeholder="Describe your issue..."
           className="w-full h-32 bg-slate-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
        />
        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest">Submit Ticket</button>
      </div>
    </div>
  );
};
export default Ticketing;