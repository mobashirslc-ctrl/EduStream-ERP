import React, { useState } from 'react';
import { Bot, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from '../../../lib/firebase'; 
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

// Environment variable থেকে কী নেওয়া হচ্ছে
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export const AIAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | string>(null);
  const [studentProfile, setStudentProfile] = useState("");

  const handleAssess = async () => {
    if (!studentProfile.trim()) return alert("Please type something first!");
    setLoading(true);

    try {
      // ১. ফায়ারস্টোর থেকে ইউনিভার্সিটি ডাটা ফেচ করা
      const uniSnapshot = await getDocs(collection(db, "universities"));
      const ourUnis = uniSnapshot.docs.map(doc => doc.data().name).join(", ");

      // ২. মডেল কনফিগারেশন (EduStream Counselor ব্যক্তিত্ব সেট করা)
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are 'EduStream Counselor', a friendly and professional expert from EduStream. Your job is to help partners and students with university admissions. If the user says 'hello' or greets you, respond warmly in a conversational style like: 'Hello! I am your EduStream Counselor. How can I help you today regarding your higher education plans?'. If they provide student details, first check if they fit these partner universities: [" + ourUnis + "]. If not, provide general expert advice from your own knowledge. Always stay in character as EduStream Counselor."
      });

      const chat = model.startChat();
      const responseResult = await chat.sendMessage(studentProfile);
      const response = await responseResult.response;
      const text = response.text();

      // ৩. ডাটাবেসে সেভ (অপশনাল, কিন্তু ট্র্যাকিংয়ের জন্য ভালো)
      await addDoc(collection(db, "assessments"), {
        userId: auth.currentUser?.uid,
        userInput: studentProfile,
        aiResponse: text,
        createdAt: serverTimestamp(),
      });

      setResult(text);
    } catch (error) {
      console.error("AI Error:", error);
      setResult("I'm having a bit of trouble connecting. Please ensure your API Key is set correctly in .env.local and restart your server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Updated Header Branding */}
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
        {/* Input area */}
        <div className="space-y-4 bg-white p-8 rounded-[2rem] border border-teal-50 shadow-xl">
          <textarea 
            placeholder="Type 'Hello' or share student details (CGPA, IELTS, Country)..."
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

        {/* AI Result Area */}
        <div className="bg-slate-950 rounded-[2rem] p-8 text-white min-h-[300px] border border-slate-800 shadow-2xl flex flex-col">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <p className="text-[10px] font-black uppercase text-teal-500 tracking-widest mb-4">Counselor Response:</p>
               <div className="prose prose-invert max-w-none">
                  <p className="text-lg font-medium leading-relaxed italic text-slate-200">
                    {result}
                  </p>
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