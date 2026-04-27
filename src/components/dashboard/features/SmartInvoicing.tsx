import React from 'react';
import { FileText, Download, CheckCircle, CreditCard } from 'lucide-react';

// "export function" use kora hoyeche jate Dashboard properly import korte pare
export function SmartInvoicing() {
  const invoices = [
    { id: "INV-2026-001", student: "Rahim Ahmed", amount: "৳15,000", status: "Paid" },
    { id: "INV-2026-002", student: "Karim Ullah", amount: "৳25,000", status: "Pending" }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl">
            <FileText size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Invoicing Center</h3>
            <p className="text-[10px] font-bold text-teal-500 uppercase tracking-[0.2em]">Partner B2B Billing Portal</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-all shadow-xl shadow-slate-100 flex items-center gap-2">
          <CreditCard size={14} /> Create New Invoice
        </button>
      </div>

      {/* Invoice List */}
      <div className="grid grid-cols-1 gap-4">
        {invoices.map((inv, i) => (
          <div key={i} className="group flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-50 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-900/5 transition-all">
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex w-12 h-12 items-center justify-center bg-slate-50 text-slate-400 rounded-xl group-hover:bg-teal-50 group-hover:text-teal-500 transition-colors">
                <FileText size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-black text-slate-800 text-sm italic uppercase tracking-tight">{inv.id}</p>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${
                    inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {inv.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Student: {inv.student}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <p className="text-lg font-black text-slate-900 tracking-tighter">{inv.amount}</p>
              <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary */}
      <div className="p-6 bg-teal-50/30 rounded-[2rem] border border-dashed border-teal-100 flex items-center justify-center gap-3">
        <CheckCircle size={16} className="text-teal-500" />
        <p className="text-[10px] font-bold text-teal-700 uppercase tracking-widest italic">
          All financial data is synced with your agency profile.
        </p>
      </div>
    </div>
  );
}