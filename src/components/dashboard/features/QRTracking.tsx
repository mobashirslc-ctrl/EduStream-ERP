import React from 'react';
import { Database, X, QrCode, Scan } from 'lucide-react';

const QRTracking = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl">
        <div className="w-24 h-24 bg-slate-100 mx-auto rounded-3xl flex items-center justify-center mb-6 border-2 border-dashed border-slate-200">
          <QrCode size={48} className="text-slate-300" />
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tighter">Smart QR Tracker</h3>
        <p className="text-sm text-slate-500 mb-8 font-medium">Scan this code to see real-time updates of this student file.</p>
        <button className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
          <Scan size={18} /> Generate New QR
        </button>
        <button onClick={onClose} className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Close</button>
      </div>
    </div>
  );
};
export default QRTracking;