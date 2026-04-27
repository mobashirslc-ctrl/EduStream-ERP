import React from 'react';
import { BarChart3, X, CheckCircle2 } from 'lucide-react';

const TrackingSystem = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const steps = ["File Received", "Compliance Check", "University Applied", "Offer Letter", "Visa Lodged"]; // Sample steps

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black flex items-center gap-2"><BarChart3 className="text-emerald-500" /> Live Tracking</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="relative">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4 mb-6">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${i === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'}`}>
                  <CheckCircle2 size={14} />
                </div>
                {i !== steps.length - 1 && <div className="w-0.5 h-full bg-slate-100"></div>}
              </div>
              <div className="pb-4">
                <p className={`text-sm font-bold ${i === 0 ? 'text-slate-800' : 'text-slate-400'}`}>{s}</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Step {i+1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TrackingSystem;