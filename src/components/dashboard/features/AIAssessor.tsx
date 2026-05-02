import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Named Export যা Dashboard.tsx এর সাথে কম্প্যাটিবল
export const AIAssessor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | string>(null);
  const [studentProfile, setStudentProfile] = useState("");

  const handleAssess = async () => {
    if (!studentProfile.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      // অফিশিয়াল SDK কনফিগারেশন - এটি ইউআরএল এরর দূর করে
      const genAI = new GoogleGenerativeAI("AIzaSyATmFPGWYTdwgE3m4hE3eAqfnBatpZEBAM");
      
      // মডেল কল করা হচ্ছে (SDK নিজেই সঠিক এন্ডপয়েন্ট খুঁজে নেবে)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are 'EduStream Counselor'. Help this student with professional advice: ${studentProfile}`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();

      if (text) {
        setResult(text);
      } else {
        setResult("Counselor is thinking. Please try again.");
      }
    } catch (error: any) {
      console.error("Gemini SDK Error:", error);
      // এরর মেসেজটি ইউজারকে স্পষ্টভাবে দেখাবে
      setResult("Counselor is currently busy. Please verify your API key or network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-[#0f4c45] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic uppercase flex items-center gap-3 tracking-tighter">
            <Sparkles className="text-teal-400" /> EduStream Counselor
          </h2>
          <p className="text-teal-100/70 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            AI-Powered Admission Partner
          </p>
        </div>
        <Bot className="absolute right-[-20px] bottom-[-20px] text-teal-800/30 rotate-12" size={180} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Card */}
        <div className="bg-white p-8 rounded-[2rem] border border-teal-50 shadow-xl space-y-4">
          <textarea 
            placeholder="Type 'Hello' to start or share student details..."
            value={studentProfile}
            onChange={(e) => setStudentProfile(e.target.value)}
            className="w-full h-44 p-6 rounded-3xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium resize-none shadow-inner text-slate-800"
          />
          <button 
            onClick={handleAssess} 
            disabled={loading} 
            className="w-full py-5 bg-[#12B2A3] text-white rounded-2xl font-black uppercase italic tracking-tighter hover:bg-teal-700 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? "Thinking..." : <>Ask Counselor <Send size={18}/></>}
          </button>
        </div>

        {/* Output Card */}
        <div className="bg-slate-950 rounded-[2rem] p-8 text-white min-h-[300px] border border-slate-800 shadow-2xl flex flex-col relative overflow-hidden">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <p className="text-[10px] font-black uppercase text-teal-500 tracking-widest mb-4">Assessment:</p>
               <p className="text-lg font-medium italic leading-relaxed text-slate-200 whitespace-pre-wrap">
                 {result}
               </p>
            </div>
          ) : (
            <div className="m-auto text-center opacity-30">
               <Bot size={48} className="mx-auto mb-4" />
               <p className="text-sm font-bold uppercase tracking-widest italic">Waiting for message...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};