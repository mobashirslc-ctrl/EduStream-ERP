import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const AIAssessor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | string>(null);
  const [studentProfile, setStudentProfile] = useState("");

  const handleAssess = async () => {
  if (!studentProfile.trim()) return;
  setLoading(true);
  setResult(null);

  try {
    const apiKey = "AIzaSyD5_Evr9ttRECyLVCL_UT1fZV2M8crifcU";
    
    // v1beta এর বদলে সরাসরি v1 এবং models এর বদলে model ব্যবহার করে দেখুন
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: studentProfile }] }]
      })
    });

    const data = await response.json();

    if (response.ok && data.candidates) {
      setResult(data.candidates[0].content.parts[0].text);
    } else {
      console.error("New API Error:", data);
      setResult("Counselor is connecting. Please wait a few seconds.");
    }
  } catch (error) {
    setResult("Connection issue. Please refresh.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-[#0f4c45] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <h2 className="text-3xl font-black italic uppercase flex items-center gap-3">
          <Sparkles className="text-teal-400" /> EduStream Counselor
        </h2>
        <Bot className="absolute right-[-20px] bottom-[-20px] text-teal-800/30 rotate-12" size={180} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border shadow-xl space-y-4">
          <textarea 
            placeholder="Type 'Hello' to start..."
            value={studentProfile}
            onChange={(e) => setStudentProfile(e.target.value)}
            className="w-full h-44 p-6 rounded-3xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium resize-none shadow-inner text-slate-800"
          />
          <button 
            onClick={handleAssess} 
            disabled={loading} 
            className="w-full py-5 bg-[#12B2A3] text-white rounded-2xl font-black uppercase italic hover:bg-teal-700 transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
          >
            {loading ? "Thinking..." : <>Ask Counselor <Send size={18}/></>}
          </button>
        </div>

        <div className="bg-slate-950 rounded-[2rem] p-8 text-white min-h-[300px] shadow-2xl flex flex-col">
          {result ? (
            <p className="text-lg font-medium italic text-slate-200 whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-2">
              {result}
            </p>
          ) : (
            <div className="m-auto text-center opacity-30 italic font-bold">Waiting for message...</div>
          )}
        </div>
      </div>
    </div>
  );
};