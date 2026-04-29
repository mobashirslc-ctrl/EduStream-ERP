import React, { useState } from 'react';
import { Bot, Sparkles, Send, CheckCircle2 } from 'lucide-react';
// আপনার ফায়ারবেস কনফিগ পাথ অনুযায়ী ইমপোর্ট করুন
import { db, auth } from '../../../lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const AIAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | string>(null);
  const [studentProfile, setStudentProfile] = useState(""); // নতুন স্টেট

  const handleAssess = async () => {
    if (!studentProfile.trim()) return alert("Please enter student details!");
    
    setLoading(true);
    try {
      // এটি একটি সিমুলেটেড AI রেসপন্স, পরে এখানে আসল AI API কল করা যাবে
      const mockAiResponse = "Based on the profile, the student is eligible for 12+ Universities in the UK. Recommended: University of East London. Scholarship chance: 65%.";

      // ফায়ারস্টোরে ডাটা সেভ করা
      await addDoc(collection(db, "assessments"), {
        userId: auth.currentUser?.uid,
        userName: auth.currentUser?.displayName || "Partner",
        profileDetails: studentProfile,
        aiFeedback: mockAiResponse,
        status: "completed",
        createdAt: serverTimestamp(),
      });

      setResult(mockAiResponse);
    } catch (error) {
      console.error("Error saving assessment:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-teal-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 flex items-center gap-3">
            <Bot className="text-teal-400" /> Smart AI Evaluator
          </h2>
          <p className="text-teal-100/70 text-sm font-bold uppercase tracking-widest">Instant Eligibility Check</p>
        </div>
        <Sparkles className="absolute right-10 top-10 text-teal-700/50" size={120} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-8 rounded-[2rem] border border-teal-50 shadow-sm">
          <label className="block text-[10px] font-black uppercase text-teal-600 tracking-widest">Input Student Profile</label>
          <textarea 
            placeholder="Paste student's CGPA, Background, and IELTS score here..."
            value={studentProfile}
            onChange={(e) => setStudentProfile(e.target.value)} // ইনপুট হ্যান্ডলিং
            className="w-full h-40 p-5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 text-sm font-medium outline-none transition-all"
          />
          <button 
            onClick={handleAssess}
            disabled={loading}
            className="w-full py-4 bg-[#12B2A3] text-white rounded-2xl font-black uppercase italic tracking-tighter hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-100"
          >
            {loading ? "Analyzing..." : <>Generate Assessment <Send size={16}/></>}
          </button>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 text-white min-h-[300px] flex flex-col justify-center border border-slate-800">
          {!result && !loading && <p className="text-center text-slate-500 font-bold italic">Waiting for student profile input...</p>}
          {loading && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-teal-400 font-black animate-pulse uppercase text-[10px] tracking-[0.2em]">AI processing data...</p>
            </div>
          )}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <CheckCircle2 size={20}/> 
                <span className="font-black italic uppercase tracking-widest text-xs text-emerald-500">Assessment Generated</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 italic leading-relaxed text-slate-200">
                "{result}"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};