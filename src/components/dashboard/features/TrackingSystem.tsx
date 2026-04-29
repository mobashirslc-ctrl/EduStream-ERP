import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Search, User, GraduationCap } from 'lucide-react';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const steps = [
  "Document Received", "Initial Screening", "IELTS Verification", "Profile Assessment", 
  "University Selection", "Application Submitted", "Offer Letter Issued", "Tuition Fee Paid",
  "CAS/I-20 Received", "Bank Statement Review", "SOP Finalization", "Visa Application",
  "Medical Appointment", "Biometric Done", "Interview Prep", "Visa Outcome",
  "Flight Booking", "Pre-Departure", "Airport Pickup", "Enrolled"
];

export const TrackingSystem = () => {
  const [passportNo, setPassportNo] = useState("");
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!passportNo) return alert("Please enter Passport Number!");
    setLoading(true);
    try {
      const q = query(collection(db, "applications"), where("passport", "==", passportNo.trim()));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setStudentData(querySnapshot.docs[0].data());
      } else {
        alert("No student found with this Passport Number!");
        setStudentData(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Box */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder="Enter Passport Number (e.g. EB0123456)"
              value={passportNo}
              onChange={(e) => setPassportNo(e.target.value)}
              className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
            <Search className="absolute left-4 top-4 text-slate-400" size={20} />
          </div>
          <button 
            onClick={handleTrack}
            disabled={loading}
            className="px-10 py-4 bg-[#12B2A3] text-white rounded-2xl font-black uppercase italic tracking-tighter hover:bg-teal-700 transition-all shadow-lg"
          >
            {loading ? "Searching..." : "Track Status"}
          </button>
        </div>
      </div>

      {studentData && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          {/* Student Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-teal-900 p-6 rounded-[2rem] text-white flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl"><User size={24}/></div>
              <div>
                <p className="text-[10px] uppercase font-black text-teal-400">Student Name</p>
                <h4 className="text-xl font-black italic uppercase">{studentData.name}</h4>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-teal-50 flex items-center gap-4">
              <div className="p-3 bg-teal-50 rounded-xl text-teal-600"><GraduationCap size={24}/></div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400">University</p>
                <h4 className="text-xl font-black italic uppercase text-teal-900">{studentData.university}</h4>
              </div>
            </div>
          </div>

          {/* 20-Step Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const isDone = index < (studentData.currentStep || 0);
              const isCurrent = index === (studentData.currentStep || 0);
              return (
                <div key={index} className={`p-5 rounded-2xl border flex items-center gap-3 ${isDone ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : isCurrent ? 'bg-teal-900 text-white shadow-xl scale-105' : 'bg-white text-slate-300 opacity-60'}`}>
                  {isDone ? <CheckCircle2 size={18}/> : isCurrent ? <Clock size={18} className="animate-spin text-teal-400"/> : <Circle size={18}/>}
                  <span className="text-[10px] font-black uppercase italic">{index + 1}. {step}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};