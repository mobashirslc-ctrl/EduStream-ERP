import React from 'react';
import { MessageSquare, X, Send, Headset } from 'lucide-react';

const Support = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] h-[500px] flex flex-col shadow-2xl overflow-hidden">
        <div className="bg-emerald-500 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white/20 rounded-lg"><Headset size={20}/></div>
             <div>
                <h3 className="font-black text-sm uppercase">Priority Chat</h3>
                <p className="text-[10px] opacity-80">We usually reply in 5 mins</p>
             </div>
          </div>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="flex-1 p-6 bg-slate-50 overflow-y-auto italic text-slate-400 text-center text-xs">
           Start a conversation with our relationship manager.
        </div>
        <div className="p-4 bg-white border-t flex gap-2">
           <input type="text" placeholder="Type here..." className="flex-1 bg-slate-100 rounded-xl px-4 text-sm outline-none" />
           <button className="bg-emerald-500 text-white p-3 rounded-xl"><Send size={18}/></button>
        </div>
      </div>
    </div>
  );
};
export default Support;