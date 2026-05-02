"use client";
import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const AIAssessor = () => {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
    const [input, setInput] = useState(""); // এখানে স্টেট ইনপুট ফিল্ডকে কন্ট্রোল করবে
    const [loading, setLoading] = useState(false);
    const [extractedData, setExtractedData] = useState({ gpa: null, ielts: null, country: "" });
    const [lastMatchedUni, setLastMatchedUni] = useState<any>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const extractInfo = (text: string) => {
        const lowerText = text.toLowerCase();
        const gpaMatch = lowerText.match(/(gpa|g\.p\.a)\s*[:=-]?\s*([0-9.]+)/i) || lowerText.match(/\b([0-5](\.[0-9]+)?)\b/);
        const ieltsMatch = lowerText.match(/(ielts|score|english)\s*[:=-]?\s*([0-9.]+)/i);
        const countries = ["australia", "uk", "usa", "canada", "germany", "malaysia"];
        const foundCountry = countries.find(c => lowerText.includes(c)) || "";

        return {
            gpa: gpaMatch ? gpaMatch[gpaMatch.length - 1] : extractedData.gpa,
            ielts: ieltsMatch ? ieltsMatch[ieltsMatch.length - 1] : extractedData.ielts,
            country: foundCountry || extractedData.country
        };
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const currentInput = input;
        const newExtracted = extractInfo(currentInput);
        setExtractedData(newExtracted);
        
        setMessages(prev => [...prev, { role: 'user', text: currentInput }]);
        setInput(""); // মেসেজ পাঠানোর পর ইনপুট ক্লিয়ার হবে
        setLoading(true);

        try {
            const response = await fetch('/api/counselor', { // পাথটি নিশ্চিত করুন
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        message: userRawText, 
        context: { gpa: extractedGPA, ielts: extractedIELTS } 
    }),
});
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
            if (data.suggestedUni) setLastMatchedUni(data.suggestedUni);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: "দুঃখিত, টেকনিক্যাল সমস্যার কারণে উত্তর দিতে পারছি না।" }]);
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF() as any;
        doc.setDrawColor(34, 197, 94); // গ্রিন বর্ডার
        doc.line(15, 25, 195, 25);
        doc.setFontSize(18);
        doc.setTextColor(34, 197, 94);
        doc.text("STUDENT ELIGIBILITY ASSESSMENT", 105, 35, { align: "center" });
        // ... বাকি PDF লজিক আগের মতোই থাকবে
        doc.save(`Assessment_Report.pdf`);
    };

    return (
        <div className="flex flex-col h-[500px] bg-slate-950 rounded-lg overflow-hidden border border-green-500/30 shadow-2xl">
            {/* চ্যাট বডি */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0f1e]">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                            m.role === 'user' 
                            ? 'bg-green-600 text-white rounded-tr-none' 
                            : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
                        }`}>
                            <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: m.text }}></p>
                            {m.role === 'ai' && i === messages.length - 1 && extractedData.gpa && (
                                <button 
                                    onClick={downloadPDF}
                                    className="mt-3 w-full bg-green-500 hover:bg-green-400 text-black py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    📥 Download AI Report (PDF)
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {loading && <div className="text-green-500 text-xs animate-pulse ml-2">AI is analyzing profile...</div>}
                <div ref={chatEndRef} />
            </div>

            {/* ইনপুট এরিয়া */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-3 items-center">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} // এটি টেক্সট লিখা নিশ্চিত করবে
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type GPA, IELTS score or ask anything..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/20"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default AIAssessor;