import React from 'react';
import { QrCode, Scan, Download, Share2 } from 'lucide-react';

// "export function" use koro Dashboard import-er sathe match korte
export function QRTracking() {
  return (
    <div className="w-full max-w-md mx-auto text-center py-4">
      {/* QR Display Area */}
      <div className="relative group mx-auto w-48 h-48 mb-8">
        <div className="absolute inset-0 bg-emerald-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="relative bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-8 flex items-center justify-center shadow-sm">
          <QrCode size={80} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-[3rem]">
             <button className="p-3 bg-slate-900 text-white rounded-full">
                <Scan size={20} />
             </button>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-black text-slate-800 mb-3 italic uppercase tracking-tighter">
        Smart QR Tracker
      </h3>
      
      <p className="text-sm text-slate-500 mb-10 font-medium italic leading-relaxed">
        Ei student file-er real-time status check korar jonno unique QR code scan koro.
      </p>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3">
        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-[1.8rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl shadow-emerald-100 transition-all">
          <Scan size={16} /> Generate New QR
        </button>
        
        <div className="grid grid-cols-2 gap-3">
           <button className="flex items-center justify-center gap-2 p-4 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
              <Download size={14} /> Download
           </button>
           <button className="flex items-center justify-center gap-2 p-4 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
              <Share2 size={14} /> Share
           </button>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
          Secure tracking ID: EDU-{Math.random().toString(36).substr(2, 9).toUpperCase()}
        </p>
      </div>
    </div>
  );
}