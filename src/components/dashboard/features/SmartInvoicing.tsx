import React from 'react';
import { FileText, X, Download } from 'lucide-react';

const SmartInvoicing = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h3 className="text-xl font-black flex items-center gap-2"><FileText className="text-emerald-500" /> Invoicing Center</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="space-y-4">
          {[1,2].map((i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all">
              <div>
                <p className="font-bold text-slate-800 text-sm">Invoice #INV-202{i}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Student: John Doe</p>
              </div>
              <button className="p-3 bg-white shadow-sm rounded-xl text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all">
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SmartInvoicing;