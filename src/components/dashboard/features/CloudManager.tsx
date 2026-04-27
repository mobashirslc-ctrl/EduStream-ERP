import React, { useState, useEffect } from 'react';
import { Camera, Loader2, CheckCircle, User, CreditCard, Send, FileText, School } from 'lucide-react';
import { auth, db } from '../../../lib/firebase'; 
import { doc, updateDoc, onSnapshot, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../lib/cloudinary';

// "export function" use kora hoyeche jate Dashboard-er logic-er sathe mile
export function CloudManager() {
  const [uploading, setUploading] = useState<string | null>(null);
  const [dbDocs, setDbDocs] = useState<any>({});
  const [studentName, setStudentName] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [isFullySubmitted, setIsFullySubmitted] = useState(false);
  
  const docs = [
    "Passport", "SSC Transcript", "HSC Transcript", 
    "Bachelor Transcript", "Master's Transcript", 
    "IELTS Certificate", "Others"
  ];

  useEffect(() => {
    if (!auth.currentUser) return;
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setDbDocs(data.documents || {});
        setStudentName(data.activeStudentName || "");
        setPassportNo(data.activePassportNo || "");
        setUniversityName(data.activeUniversityName || "");
      }
    });
    return () => unsub();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;

    if (!studentName || !passportNo || !universityName) {
      alert("Please fill in Student Name, Passport No, and University Name first!");
      return;
    }

    setUploading(type);
    try {
      const url = await uploadToCloudinary(file);
      const userRef = doc(db, "users", auth.currentUser.uid);
      
      await updateDoc(userRef, {
        [`documents.${type}`]: url,
        activeStudentName: studentName,
        activePassportNo: passportNo,
        activeUniversityName: universityName,
        lastUpdated: serverTimestamp(),
        recentSubmissions: arrayUnion({
          title: `${type} uploaded for ${studentName}`,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          status: 'success'
        })
      });

    } catch (err: any) {
      console.error("Upload Error:", err);
      alert("Upload failed. Check settings.");
    } finally {
      setUploading(null);
    }
  };

  const finalizeSubmission = async () => {
    if (!studentName || !universityName || Object.keys(dbDocs).length === 0) {
      alert("Details ebong documents upload koro.");
      return;
    }

    setIsFullySubmitted(true);
    const userRef = doc(db, "users", auth.currentUser!.uid);

    const newSubmission = {
      studentName,
      universityName,
      passportNo,
      documents: dbDocs,
      status: 'Pending',
      submittedAt: new Date().toLocaleString(),
      timestamp: serverTimestamp()
    };

    await updateDoc(userRef, {
      submissionStatus: 'Ready for Review',
      activeApplication: newSubmission,
      recentSubmissions: arrayUnion(newSubmission)
    });

    setTimeout(() => {
      setIsFullySubmitted(false);
    }, 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Success Animation Overlay */}
      {isFullySubmitted && (
        <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-6 animate-in fade-in rounded-[2rem]">
          <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={40} className="animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase">Files Submitted!</h2>
          <p className="text-slate-500 font-bold mt-2 text-sm uppercase tracking-widest">Sent to Compliance Hub</p>
        </div>
      )}

      <div className="space-y-6">
        {/* INPUTS SECTION */}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={16} />
                <input 
                  type="text" placeholder="Student Name" value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
             </div>
             <div className="relative">
                <CreditCard className="absolute left-4 top-4 text-slate-400" size={16} />
                <input 
                  type="text" placeholder="Passport Number" value={passportNo}
                  onChange={(e) => setPassportNo(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
             </div>
          </div>
          <div className="relative">
            <School className="absolute left-4 top-4 text-slate-400" size={16} />
            <input 
              type="text" placeholder="Target University Name" value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>
        </div>

        {/* FILE LIST */}
        <div className="grid grid-cols-1 gap-3">
          {docs.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${dbDocs[d] ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                   <FileText size={18} />
                </div>
                <span className={`text-sm font-black italic uppercase tracking-tighter ${dbDocs[d] ? 'text-slate-900' : 'text-slate-400'}`}>{d}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="file" className="hidden" id={`f-${i}`} onChange={(e) => handleUpload(e, d)} disabled={uploading === d} />
                <label 
                  htmlFor={`f-${i}`} 
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all ${
                    dbDocs[d] ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-900 text-white hover:bg-emerald-600'
                  }`}
                >
                  {uploading === d ? <Loader2 className="animate-spin h-3 w-3" /> : dbDocs[d] ? 'Update' : 'Select'}
                </label>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={finalizeSubmission}
          className="w-full bg-emerald-500 text-white py-5 rounded-3xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-emerald-100"
        >
          <Send size={18} /> Send Application
        </button>
      </div>
    </div>
  );
}