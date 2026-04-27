import React, { useState } from 'react';
import { Camera, X, Loader2, CheckCircle } from 'lucide-react';
import { auth, db } from '../../../lib/firebase'; // Path thik koro proyojone
import { doc, updateDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../lib/cloudinary'; // Path thik koro

const CloudManager = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  
  const docs = ["Passport", "SSC Transcript", "HSC Transcript", "IELTS/English", "Others"];
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;

    setUploading(type);
    try {
      // 1. Upload to Cloudinary
      const url = await uploadToCloudinary(file);
      
      // 2. Update Firestore User Document
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        [`documents.${type}`]: url,
        lastUpdated: new Date().toISOString()
      });

      setUploadedDocs(prev => [...prev, type]);
      alert(`${type} upload success!`);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black flex items-center gap-2 text-slate-800">
            <Camera className="text-emerald-500" /> Upload Documents
          </h3>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="space-y-3">
          {docs.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-sm font-bold text-slate-600">{d}</span>
              
              <div className="flex items-center gap-2">
                {uploadedDocs.includes(d) && <CheckCircle size={16} className="text-emerald-500" />}
                
                <input 
                  type="file" 
                  className="hidden" 
                  id={`f-${i}`} 
                  onChange={(e) => handleUpload(e, d)}
                  disabled={uploading === d}
                />
                
                <label 
                  htmlFor={`f-${i}`} 
                  className={`border px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    uploading === d ? 'bg-slate-200' : 'bg-white hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  {uploading === d ? <Loader2 className="animate-spin h-4 w-4" /> : 'Choose File'}
                </label>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-colors"
        >
          Submit & Save Changes
        </button>
      </div>
    </div>
  );
};

export default CloudManager;