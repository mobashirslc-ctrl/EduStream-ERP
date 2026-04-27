import React, { useState, useEffect } from 'react';
import { Camera, X, Loader2, CheckCircle, User, CreditCard, Send, FileText, School } from 'lucide-react';
import { auth, db } from '../../../lib/firebase'; 
import { doc, updateDoc, onSnapshot, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../lib/cloudinary';

const CloudManager = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [uploading, setUploading] = useState<string | null>(null);
  const [dbDocs, setDbDocs] = useState<any>({});
  const [studentName, setStudentName] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [universityName, setUniversityName] = useState(""); // Notun Input
  const [isFullySubmitted, setIsFullySubmitted] = useState(false);
  
  // IELTS ebong baki gulo fix kora hoyeche
  const docs = [
    "Passport", 
    "SSC Transcript", 
    "HSC Transcript", 
    "Bachelor Transcript", 
    "Master's Transcript", 
    "IELTS Certificate", // Corrected Name
    "Others"
  ];

  useEffect(() => {
    if (!auth.currentUser || !isOpen) return;
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
  }, [isOpen]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;

    // Validation
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
      alert("Upload failed. Please check your internet or Cloudinary settings.");
    } finally {
      setUploading(null);
    }
  };

  const finalizeSubmission = async () => {
    if (!studentName || Object.keys(dbDocs).length === 0) {
      alert("Please enter details and upload at least one document.");
      return;
    }

    setIsFullySubmitted(true);
    await updateDoc(doc(db, "users", auth.currentUser!.uid), {
      submissionStatus: 'Ready for Review',
      complianceStatus: 'Pending',
      lastSubmissionDate: serverTimestamp()
    });

    setTimeout(() => {
      setIsFullySubmitted(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
        
        {isFullySubmitted && (
          <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-6 animate-in fade-in">
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
              <CheckCircle size={40} className="animate-pulse" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Files Submitted!</h2>
            <p className="text-slate-500 font-bold mt-2 text-sm uppercase tracking-widest">Sent to Compliance Hub</p>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black flex items-center gap-2 text-slate-800 uppercase tracking-tighter">
            <Camera className="text-emerald-500" /> New Application
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X size={20}/></button>
        </div>

        {/* --- 3 INPUT BOXES --- */}
        <div className="grid grid-cols-1 gap-3 mb-8">
          <div className="grid grid-cols-2 gap-3">
             <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={14} />
                <input 
                  type="text" placeholder="Student Name" value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                />
             </div>
             <div className="relative">
                <CreditCard className="absolute left-4 top-3.5 text-slate-400" size={14} />
                <input 
                  type="text" placeholder="Passport Number" value={passportNo}
                  onChange={(e) => setPassportNo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                />
             </div>
          </div>
          <div className="relative">
            <School className="absolute left-4 top-3.5 text-slate-400" size={14} />
            <input 
              type="text" placeholder="Target University Name" value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* --- FILE LIST --- */}
        <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-2 mb-6 custom-scrollbar">
          {docs.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 group">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${dbDocs[d] ? 'bg-emerald-500 text-white' : 'bg-white border text-slate-300'}`}>
                   <FileText size={14} />
                </div>
                <span className={`text-[13px] font-bold ${dbDocs[d] ? 'text-slate-900' : 'text-slate-500'}`}>{d}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="file" className="hidden" id={`f-${i}`} onChange={(e) => handleUpload(e, d)} disabled={uploading === d} />
                <label 
                  htmlFor={`f-${i}`} 
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all ${
                    dbDocs[d] ? 'bg-emerald-50 text-emerald-600' : 'bg-white border text-slate-400 hover:text-emerald-500'
                  }`}
                >
                  {uploading === d ? <Loader2 className="animate-spin h-3 w-3" /> : dbDocs[d] ? 'Change' : 'Select'}
                </label>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={finalizeSubmission}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl"
        >
          <Send size={18} /> Send Application
        </button>
      </div>
    </div>
  );
};

export default CloudManager;