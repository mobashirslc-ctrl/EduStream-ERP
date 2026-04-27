import React, { useState } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';

// "export function" use kora hoyeche jate Dashboard properly import korte pare
export function AIAssessment() {
  const [input, setInput] = useState("");
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const functions = getFunctions();
      const callAI = httpsCallable(functions, 'askEduconsultAI');
      const result: any = await callAI({ prompt: input });
      setRes(result.data.answer);
    } catch (e) { 
      console.error(e); 
      setRes("Error: AI service ekhon available nei. Abar try koro.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header section inside the Modal content */}
      <div className="bg-emerald-500/10 p-6 rounded-[2rem] flex items-center gap-4 border border-emerald-100">
        <div className="bg-emerald-500 p-3 rounded-xl text-white">
          <Zap size={24} fill="currentColor" />
        </div>
        <div>
          <h3 className="font-black text-emerald-900 uppercase italic tracking-tighter">Educonsult AI Counselor</h3>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">B2B Eligibility Engine</p>
        </div>
      </div>

      <div className="space-y-4">
        <textarea 
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.8rem] p-6 text-sm outline-none h-40 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium text-slate-700"
          placeholder="Student-er details likhun (e.g. GPA 4.5, HSC 2024, UK jete chay, budget 15k GBP)..."
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button 
          onClick={handleAI} 
          disabled={loading || !input.trim()} 
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-emerald-100 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Zap size={16} fill="currentColor" /> Start AI Assessment</>}
        </button>

        {res && (
          <div className="mt-8 p-6 bg-white border-2 border-emerald-50 rounded-[2rem] shadow-sm animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">AI Result Analysis</span>
            </div>
            <div className="text-slate-700 text-sm leading-relaxed font-medium italic">
              {res}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}