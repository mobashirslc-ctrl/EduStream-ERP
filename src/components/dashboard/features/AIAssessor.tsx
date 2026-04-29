import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';

export const AIAssessor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | string>(null); // Type safety added
  const [studentProfile, setStudentProfile] = useState("");

  const handleAssess = async () => {
    if (!studentProfile.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const cleanKey = "AIzaSyBHW2CEK1Z_NBmWvNEZF4OY0VFdPbsVvMg";
      // v1 Stable URL ব্যবহার করা হয়েছে
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${cleanKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: `You are 'EduStream Counselor'. Analyze this student inquiry and provide professional guidance: ${studentProfile}` }] 
          }]
        })
      });

      const data = await response.json();

      if (response.ok && data.candidates && data.candidates[0].content) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        console.error("API Detail Error:", data);
        setResult("Counselor is currently busy. Please try again in a moment.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setResult("Unable to connect. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-[#0f4c45] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 flex items-center gap-3">
            <Sparkles className="text-teal-400" /> EduStream Counselor
          </h2>
          <p className="text-teal-100/70 text-xs font-bold uppercase tracking-[0.3em]">AI-Powered Admission Partner</p>
        </div>
        <Bot className="absolute right-[-20px] bottom-[-20px] text-teal-800/30 rotate-12" size={180} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Card */}
        <div className="space-y-4 bg-white p-8 rounded-[2rem] border border-teal-50 shadow-xl">
          <textarea 
            placeholder="Type 'Hello' to start or share student details..."
            value={studentProfile}
            onChange={(e) => setStudentProfile(e.target.value)}
            className="w-full h-44 p-6 rounded-3xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium transition-all shadow-inner resize-none"
          />
          <button 
            onClick={handleAssess} 
            disabled={loading} 
            className="w-full py-5 bg-[#12B2A3] text-white rounded-2xl font-black uppercase italic tracking-tighter hover:bg-teal-700 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? "Counselor is thinking..." : <>Ask Counselor <Send size={18}/></>}
          </button>
        </div>

        {/* Output Card */}
        <div className="bg-slate-950 rounded-[2rem] p-8 text-white min-h-[300px] border border-slate-800 shadow-2xl flex flex-col">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <p className="text-[10px] font-black uppercase text-teal-500 tracking-widest mb-4">Counselor Assessment:</p>
               <div className="prose prose-invert max-w-none">
                  {/* whitespace-pre-wrap ensures paragraphs are displayed correctly */}
                  <p className="text-lg font-medium leading-relaxed italic text-slate-200 whitespace-pre-wrap">{result}</p>
               </div>
            </div>
          ) : (
            <div className="m-auto text-center opacity-30">
               <Bot size={48} className="mx-auto mb-4" />
               <p className="text-sm font-bold uppercase tracking-widest italic">Waiting for student profile...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};