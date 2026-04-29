import React, { useState } from 'react';
import { Bot, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from '../../../lib/firebase'; 
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

// আপনার দেওয়া API Key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
export const AIAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | string>(null);
  const [studentProfile, setStudentProfile] = useState("");

  const handleAssess = async () => {
    if (!studentProfile.trim()) return alert("Please enter student details!");
    setLoading(true);

    try {
      // ১. ফায়ারস্টোর থেকে আমাদের ইউনিভার্সিটি ডাটা নেওয়া
      const uniSnapshot = await getDocs(collection(db, "universities"));
      const ourUnis = uniSnapshot.docs.map(doc => doc.data().name).join(", ");

      // ২. Gemini-র জন্য প্রম্পট তৈরি করা
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
        You are an expert student counselor. 
        Student Profile: ${studentProfile}
        Our Partner Universities: ${ourUnis || "Not specified in local database"}
        
        Task: 
        1. If any university from "Our Partner Universities" matches the student profile, suggest them first.
        2. If no match is found in our list, use your own knowledge to suggest best global universities.
        3. Provide scholarship probability and key advice.
        Keep the tone professional and encouraging.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // ৩. ডাটাবেসে সেভ করা
      await addDoc(collection(db, "assessments"), {
        userId: auth.currentUser?.uid,
        profileDetails: studentProfile,
        aiFeedback: text,
        createdAt: serverTimestamp(),
      });

      setResult(text);
    } catch (error) {
      console.error("AI Error:", error);
      setResult("AI logic connected, but please check your internet or API limits.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* UI Code (আগের মতোই থাকবে, শুধু লোডিং স্টেট এবং রেজাল্ট পার্টটি আপডেট হবে) */}
      <div className="bg-teal-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 flex items-center gap-3">
          <Bot className="text-teal-400" /> Live Gemini AI
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-8 rounded-[2rem] border border-teal-50 shadow-xl">
          <textarea 
            placeholder="Describe student's profile (e.g. CGPA 3.5, IELTS 6.5, interested in UK)..."
            value={studentProfile}
            onChange={(e) => setStudentProfile(e.target.value)}
            className="w-full h-44 p-5 rounded-3xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button onClick={handleAssess} disabled={loading} className="w-full py-5 bg-[#12B2A3] text-white rounded-2xl font-black uppercase italic tracking-tighter shadow-lg">
            {loading ? "Gemini is thinking..." : "Get Live Assessment"}
          </button>
        </div>

        <div className="bg-slate-950 rounded-[2rem] p-8 text-white min-h-[300px] border border-slate-800 shadow-2xl overflow-y-auto">
          {result ? (
            <div className="prose prose-invert">
              <p className="whitespace-pre-wrap italic leading-relaxed text-slate-100">{result}</p>
            </div>
          ) : (
            <p className="m-auto text-center text-slate-500 italic">Waiting for profile analysis...</p>
          )}
        </div>
      </div>
    </div>
  );
};