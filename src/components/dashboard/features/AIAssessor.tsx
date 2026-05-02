"use client";
import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const AIAssessor = () => {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [extractedData, setExtractedData] = useState({ gpa: null, ielts: null, country: "" });
    const [lastMatchedUni, setLastMatchedUni] = useState<any>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // অটো-স্ক্রল লজিক
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ১. ডাটা এক্সট্রাকশন লজিক (আপনার আগের Regex ব্যবহার করা হয়েছে)
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

    // ২. এআই চ্যাট এবং অ্যাসেসমেন্ট লজিক
    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const newExtracted = extractInfo(input);
        setExtractedData(newExtracted);
        
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");
        setLoading(true);

        try {
            // Gemini API কল (আপনার বর্তমান API রুট অনুযায়ী)
            const response = await fetch('/api/counselor', {
                method: 'POST',
                body: JSON.stringify({ 
                    message: userMsg,
                    context: newExtracted 
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

    // ৩. পিডিএফ জেনারেশন (আপনার আগের প্রজেক্টের স্টাইল ও লজিক অনুযায়ী)
    const downloadPDF = () => {
        const doc = new jsPDF() as any;
        const partner = JSON.parse(localStorage.getItem('user') || '{}');

        // হেডার ও লোগো
        doc.setDrawColor(43, 0, 84);
        doc.line(15, 25, 195, 25);
        doc.setFontSize(18);
        doc.setTextColor(43, 0, 84);
        doc.text("STUDENT ELIGIBILITY ASSESSMENT", 105, 35, { align: "center" });

        // স্টুডেন্ট প্রোফাইল সেকশন
        doc.setFillColor(245, 245, 245);
        doc.rect(15, 42, 180, 15, 'F');
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.text(`Agency: ${partner.orgName || 'SCC Partner'}`, 20, 51);
        doc.text(`Profile: GPA ${extractedData.gpa || 'N/A'} | IELTS ${extractedData.ielts || 'N/A'}`, 100, 51);

        // এআই অবজারভেশন (শেষ এআই মেসেজ থেকে নেওয়া)
        const lastAIRes = messages.filter(m => m.role === 'ai').pop()?.text || "";
        doc.setFont("helvetica", "bold");
        doc.text("AI Counselor Observation:", 15, 70);
        doc.setFont("helvetica", "normal");
        const splitObs = doc.splitTextToSize(lastAIRes, 175);
        doc.text(splitObs, 15, 77);

        // ইউনিভার্সিটি টেবিল (যদি থাকে)
        if (lastMatchedUni) {
            doc.autoTable({
                startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 110,
                head: [['Field', 'Details']],
                body: [
                    ['Recommended University', lastMatchedUni.name],
                    ['Country', lastMatchedUni.country],
                    ['Tuition Fee', `${lastMatchedUni.fee} USD`],
                ],
                headStyles: { fillColor: [43, 0, 84] }
            });
        }

        doc.save(`Assessment_Report_${Date.now()}.pdf`);
    };

    return (
        <div className="flex flex-col h-[500px] bg-slate-900 rounded-lg overflow-hidden border border-gold/30">
            {/* চ্যাট বডি */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${m.role === 'user' ? 'bg-amber-500 text-black' : 'bg-slate-800 text-white border border-slate-700'}`}>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: m.text }}></p>
                            {m.role === 'ai' && i === messages.length - 1 && extractedData.gpa && (
                                <button 
                                    onClick={downloadPDF}
                                    className="mt-3 w-full bg-slate-700 hover:bg-slate-600 text-amber-500 py-1 rounded text-xs font-bold transition-all"
                                >
                                    📥 Download AI PDF Report
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {loading && <div className="text-slate-400 text-xs animate-pulse">AI is thinking...</div>}
                <div ref={chatEndRef} />
            </div>

            {/* ইনপুট এরিয়া */}
            <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type GPA, IELTS score..."
                    className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
                <button 
                    onClick={handleSendMessage}
                    className="bg-amber-500 text-black px-4 py-2 rounded font-bold hover:bg-amber-400"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export { AIAssessor };