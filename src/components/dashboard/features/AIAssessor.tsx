import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';

// Named Export ব্যবহার করা হয়েছে যা Dashboard.tsx এর সাথে মিলে যাবে
export const AIAssessor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | string>(null);
  const [studentProfile, setStudentProfile] = useState("");

  const handleAssess = async () => {
    if (!studentProfile.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const apiKey = "AIzaSyATmFPGWYTdwgE3m4hE3eAqfnBatpZEBAM"; 
      // v1 (Stable) API ব্যবহার করা হয়েছে যা 404 এরর সমাধান করবে
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are 'EduStream Counselor'. Help this student: ${studentProfile}` }]
          }]
        })
      });

      const data = await response.json();

      if (response.ok && data.candidates) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        console.error("Debug Error Detail:", data);
        setResult("Counselor is updating. Please try one last time.");
      }
    } catch (error) {
      setResult("Connection issue. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* আপনার আগের সুন্দর UI কোড এখানে থাকবে */}
      <div className="bg-[#0f4c45] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <h2 className="text-3xl font-black italic uppercase flex items-center gap-3">
          <Sparkles className="text-teal-400" /> EduStream Counselor
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border shadow-xl">
          <textarea 
            placeholder="Type 'Hello' to start..."
            value={studentProfile}
            onChange={(e) => setStudentProfile(e.target.value)}
            className="w-full h-44 p-6 rounded-3xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium resize-none"
          />
          <button 
            onClick={handleAssess} 
            disabled={loading} 
            className="w-full py-5 bg-[#12B2A3] text-white rounded-2xl font-black uppercase italic tracking-tighter hover:bg-teal-700 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            {loading ? "Thinking..." : "Ask Counselor"}
          </button>
        </div>

        <div className="bg-slate-950 rounded-[2rem] p-8 text-white min-h-[300px] flex flex-col">
          {result ? (
            <p className="text-lg font-medium italic whitespace-pre-wrap">{result}</p>
          ) : (
            <div className="m-auto text-center opacity-30 italic font-bold">Waiting for message...</div>
          )}
        </div>
      </div>
    </div>
  );
};