import React, { useState } from 'react';
import { Zap, X, Loader2, FileText } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { jsPDF } from 'jspdf';

const AIAssessment = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [input, setInput] = useState("");
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    setLoading(true);
    try {
      const functions = getFunctions();
      const callAI = httpsCallable(functions, 'askEduconsultAI');
      const result: any = await callAI({ prompt: input });
      setRes(result.data.answer);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-emerald-500 p-6 flex justify-between items-center text-white">
          <h3 className="font-bold flex items-center gap-2"><Zap size={20}/> Educonsult AI Counselor</h3>
          <button onClick={onClose} className="hover:rotate-90 transition-all"><X /></button>
        </div>
        <div className="p-8">
          <textarea 
            className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm outline-none h-32 focus:ring-2 focus:ring-emerald-500"
            placeholder="Student-er details likhun (e.g. GPA 4.5, UK jete chay)..."
            value={input} onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleAI} disabled={loading} className="w-full mt-4 bg-emerald-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : 'Start Assessment'}
          </button>
          {res && (
            <div className="mt-6 p-5 bg-emerald-50 rounded-2xl border border-emerald-100 italic text-slate-700 text-sm">
              {res}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AIAssessment;