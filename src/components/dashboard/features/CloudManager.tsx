import React, { useState } from 'react';
import { Camera, X, Upload, FileCheck } from 'lucide-react';

const CloudManager = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const docs = ["Passport", "SSC Transcript", "HSC Transcript", "IELTS/English", "Others"];
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black flex items-center gap-2 text-slate-800"><Camera className="text-emerald-500" /> Upload Documents</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="space-y-3">
          {docs.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-sm font-bold text-slate-600">{d}</span>
              <input type="file" className="hidden" id={`f-${i}`} />
              <label htmlFor={`f-${i}`} className="bg-white border px-4 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-50 hover:text-emerald-600 transition-all">Choose File</label>
            </div>
          ))}
        </div>
        <button className="w-full mt-8 bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-100">Submit & Generate Invoice</button>
      </div>
    </div>
  );
};
export default CloudManager;