import React from 'react';
import { Megaphone, Layout, Download, Star } from 'lucide-react';

// "export function" use koro jate Dashboard-er logic-er shathe mile jay
export function MarketingStudio() {
  const assets = [
    { name: "Visa Poster", type: "Image" },
    { name: "Scholarship Flyer", type: "PDF" },
    { name: "Facebook Ad Copy", type: "Text" },
    { name: "Email Campaign", type: "HTML" }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Marketing Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl shadow-teal-100">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Megaphone size={24} className="text-teal-100" />
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Agency Marketing Studio</h3>
          </div>
          <p className="text-teal-50 text-xs font-bold uppercase tracking-[0.2em] opacity-80">
            Professional B2B Branding Assets
          </p>
        </div>
        <Star className="absolute right-[-10px] bottom-[-10px] w-32 h-32 text-white/10 rotate-12" />
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {assets.map((item, i) => (
          <div key={i} className="group p-6 bg-white border-2 border-slate-50 rounded-[2rem] hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-900/5 transition-all cursor-pointer flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-teal-50 group-hover:text-teal-500 transition-colors">
              <Layout size={28} />
            </div>
            
            <h4 className="text-sm font-black text-slate-800 italic uppercase tracking-tighter mb-1">
              {item.name}
            </h4>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              {item.type} Asset
            </span>

            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-teal-500 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
              <Download size={12} /> Download
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="p-6 bg-teal-50/50 rounded-[2rem] border border-dashed border-teal-200 text-center">
        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest italic">
          New templates are added every Monday
        </p>
      </div>
    </div>
  );
}