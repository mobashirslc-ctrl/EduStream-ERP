import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from '../../../lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

export const AIAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | string>(null);
  const [studentProfile, setStudentProfile] = useState("");

  const handleAssess = async () => {
    if (!studentProfile.trim()) return alert("Please type something first!");

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("Checking API Key Status:", apiKey ? "Loaded ✅" : "Missing ❌");

    if (!apiKey) {
      setResult("Error: API Key is missing. Please ensure it is set in Vercel Settings.");
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    setLoading(true);

    try {
      const uniSnapshot = await getDocs(collection(db, "universities"));
      const ourUnis = uniSnapshot.docs.map(doc => doc.data().name).join(", ");

      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      }, { apiVersion: 'v1' });

      // ৩. কন্টেন্ট জেনারেট করা (সিস্টেম ইনস্ট্রাকশন এখানে প্রম্পট হিসেবে পাঠানোই সবচেয়ে নিরাপদ)
      const prompt = `System: You are 'EduStream Counselor'. Partner unis: [${ourUnis}].\nUser: ${studentProfile}`;
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      setResult(responseText);

      if (auth.currentUser) {
        await addDoc(collection(db, "assessments"), {
          userId: auth.currentUser.uid,
          input: studentProfile,
          output: responseText,
          timestamp: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("AI Error:", error);
      setResult("I'm having a bit of trouble connecting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#0f4c45] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 flex items-center gap-3">
            <Sparkles className="text-teal-400" /> EduStream Counselor
          </h2>
          <p className="text-teal-100/70 text-xs font-bold uppercase tracking-[0.3em]">Your AI-Powered Admission Partner</p>
        </div>
        <Bot className="absolute right-[-20px] bottom-[-20px] text-teal-800/30 rotate-12" size={180} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-8 rounded-[2rem] border border-teal-50 shadow-xl">
          <textarea 
            placeholder="Type 'Hello'..."
            value={studentProfile}
            onChange={(e) => setStudentProfile(e.target.value)}
            className="w-full h-44 p-6 rounded-3xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium transition-all shadow-inner resize-none"
          />
          <button 
            onClick={handleAssess} 
            disabled={loading} 
            className="w-full py-5 bg-[#12B2A3] text-white rounded-2xl font-black uppercase italic tracking-tighter hover:bg-teal-700 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
          >
            {loading ? "Counselor is thinking..." : <>Ask Counselor <Send size={18}/></>}
          </button>
        </div>

        <div className="bg-slate-950 rounded-[2rem] p-8 text-white min-h-[300px] border border-slate-800 shadow-2xl flex flex-col">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <p className="text-[10px] font-black uppercase text-teal-500 tracking-widest mb-4">Counselor Response:</p>
               <div className="prose prose-invert max-w-none">
                  <p className="text-lg font-medium leading-relaxed italic text-slate-200">{result}</p>
               </div>
            </div>
          ) : (
            <div className="m-auto text-center opacity-30">
               <Bot size={48} className="mx-auto mb-4" />
               <p className="text-sm font-bold uppercase tracking-widest italic">Waiting for your message...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};