import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { db, auth } from '../../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const steps = [
  "Document Received", "Initial Screening", "IELTS Verification", "Profile Assessment", 
  "University Selection", "Application Submitted", "Offer Letter Issued", "Tuition Fee Paid",
  "CAS/I-20 Received", "Bank Statement Review", "SOP Finalization", "Visa Application",
  "Medical Appointment", "Biometric Done", "Interview Prep", "Visa Outcome",
  "Flight Booking", "Pre-Departure", "Airport Pickup", "Enrolled"
];

export const TrackingSystem = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Real-time listener for application status
    const unsub = onSnapshot(doc(db, "applications", user.uid), (doc) => {
      if (doc.exists()) {
        setCurrentStep(doc.data().currentStep || 0);
      }
    });

    return () => unsub();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between bg-white p-8 rounded-[2.5rem] border border-teal-50">
        <div className="text-4xl font-black text-[#12B2A3]">
          {Math.round((currentStep / steps.length) * 100)}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => {
          const isDone = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={index} className={`p-5 rounded-2xl border ${isDone ? 'bg-emerald-50' : isCurrent ? 'bg-teal-900 text-white' : 'bg-white'}`}>
              {isDone ? <CheckCircle2 size={18}/> : isCurrent ? <Clock size={18} className="animate-spin"/> : <Circle size={18}/>}
              <span>{index + 1}. {step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};