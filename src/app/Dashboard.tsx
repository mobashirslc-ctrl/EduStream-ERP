import { useState, useEffect } from 'react';
import { 
  FileText, FolderOpen, Bell, LogOut, Plus, Lock, Globe, Zap, 
  Database, ShieldCheck, BarChart3, Users, MessageSquare, Clock, Camera 
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { jsPDF } from "jspdf"; // PDF generate korar jonno lagbe

// --- FEATURE COMPONENTS ---
import AIAssessment from '../components/dashboard/features/AIAssessment';
import CloudManager from '../components/dashboard/features/CloudManager';
import TrackingSystem from '../components/dashboard/features/TrackingSystem';
import MailAlerts from '../components/dashboard/features/MailAlerts';
import SmartInvoicing from '../components/dashboard/features/SmartInvoicing';
import Compliance from '../components/dashboard/features/Compliance';
import MarketingStudio from '../components/dashboard/features/MarketingStudio';
import QRTracking from '../components/dashboard/features/QRTracking';
import Ticketing from '../components/dashboard/features/Ticketing';
import Support from '../components/dashboard/features/Support';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const brandColor = "#10b981"; 

  const allFeatures = [
    { id: 'ai_assessment', name: 'AI Assessment', icon: Zap, minPackage: 'Basic' },
    { id: 'cloudinary', name: 'Cloud Manager', icon: Camera, minPackage: 'Basic' },
    { id: 'tracking', name: '20-Step Track', icon: BarChart3, minPackage: 'Basic' },
    { id: 'mail_alerts', name: 'Mail Alerts', icon: Bell, minPackage: 'Standard' },
    { id: 'invoicing', name: 'Smart Invoice', icon: FileText, minPackage: 'Standard' },
    { id: 'compliance', name: 'Compliance', icon: Users, minPackage: 'Standard' },
    { id: 'marketing', name: 'Marketing', icon: Globe, minPackage: 'Professional' },
    { id: 'qr_tracking', name: 'QR Tracking', icon: Database, minPackage: 'Professional' },
    { id: 'ticketing', name: 'Ticketing', icon: ShieldCheck, minPackage: 'Professional' },
    { id: 'support', name: 'Priority Support', icon: MessageSquare, minPackage: 'Professional' },
  ];

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUserData(data);
        
        if (data.status === 'trial') {
          const startTime = new Date(data.createdAt).getTime();
          const currentTime = new Date().getTime();
          const expiryTime = startTime + (2 * 60 * 60 * 1000);
          const remaining = expiryTime - currentTime;
          setTimeLeft(remaining > 0 ? `${Math.floor(remaining / 60000)}m` : "Expired");
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // --- PDF GENERATION LOGIC ---
  const generateCombinedPDF = (sub: any) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(16, 185, 129);
    doc.text("EDUCONSULT APPLICATION SUMMARY", 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Student Name: ${sub.studentName || 'N/A'}`, 20, 40);
    doc.text(`Passport: ${sub.passportNo || 'N/A'}`, 20, 50);
    doc.text(`University: ${sub.universityName || 'N/A'}`, 20, 60);
    doc.text(`Submitted At: ${sub.submittedAt || 'N/A'}`, 20, 70);
    
    doc.text("Document Links (Click to View):", 20, 90);
    let y = 100;
    Object.entries(sub.documents || {}).forEach(([key, url]: any) => {
      doc.setTextColor(0, 0, 255);
      doc.text(`- ${key}`, 25, y);
      doc.link(25, y - 5, 100, 10, { url });
      y += 10;
    });
    doc.save(`${sub.studentName || 'Student'}_Files.pdf`);
  };

  const isFeatureLocked = (minPackage: string) => {
    if (userData?.status === 'trial') return false; 
    const packages = ['Basic', 'Standard', 'Professional'];
    const userPkg = userData?.package || 'Basic';
    return packages.indexOf(userPkg) < packages.indexOf(minPackage);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-500">Loading Educonsult...</div>;

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2">
             <div style={{ backgroundColor: brandColor }} className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs">HP</div>
             <h1 className="text-lg font-black tracking-tighter uppercase">Partner <span style={{ color: brandColor }}>Portal</span></h1>
          </div>
        </div>
        
        <nav className="flex-1 px-3 overflow-y-auto space-y-1 custom-scrollbar">
          {allFeatures.map((f) => (
            <div 
              key={f.id} 
              onClick={() => !isFeatureLocked(f.minPackage) && setActiveFeature(f.id)}
              className={`flex items-center justify-between px-4 py-2.5 text-[13px] font-bold rounded-xl cursor-pointer transition-all ${activeFeature === f.id ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <f.icon className="h-4 w-4" /> {f.name}
              </div>
              {isFeatureLocked(f.minPackage) && <Lock className="h-3 w-3 opacity-30" />}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <button onClick={() => auth.signOut()} className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-500 transition-all font-bold text-xs uppercase tracking-wider">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#fdfdfd] p-6 lg:p-10">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900">Hi, {userData?.companyName || 'Partner'}! 👋</h2>
            {userData?.status === 'trial' ? (
              <div className="inline-flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full mt-2 text-[10px] border border-emerald-100 uppercase tracking-widest">
                <Clock className="h-3.5 w-3.5" /> Trial: {timeLeft} left
              </div>
            ) : (
              <p className="text-slate-400 mt-1 text-[10px] font-bold uppercase tracking-widest">Plan: <span style={{ color: brandColor }}>{userData?.package}</span></p>
            )}
          </div>
          <button onClick={() => setActiveFeature('cloudinary')} style={{ backgroundColor: brandColor }} className="text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:scale-105 transition-all flex items-center gap-2 text-xs uppercase tracking-wider">
            <Plus className="h-4 w-4" /> New Application
          </button>
        </header>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {allFeatures.map((feature) => {
            const locked = isFeatureLocked(feature.minPackage);
            return (
              <div 
                key={feature.id} 
                onClick={() => !locked && setActiveFeature(feature.id)}
                className={`group relative p-5 lg:p-6 rounded-[1.5rem] border transition-all duration-300 cursor-pointer ${locked ? 'bg-slate-50/50 border-slate-100 grayscale opacity-60' : 'bg-white border-slate-50 shadow-sm hover:shadow-xl hover:shadow-emerald-100/40 hover:-translate-y-1'}`}
              >
                {locked && (
                  <div className="absolute top-4 right-4 bg-slate-200/50 p-1.5 rounded-full">
                    <Lock className="h-3 w-3 text-slate-400" />
                  </div>
                )}
                <div style={{ color: locked ? '#cbd5e1' : brandColor }} className={`mb-4 p-3 rounded-xl w-fit transition-all ${locked ? 'bg-slate-100' : 'bg-emerald-50 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                  <feature.icon className="h-6 w-6 lg:h-7 lg:w-7" />
                </div>
                <h3 className={`font-black text-xs lg:text-sm tracking-tight mb-1 ${locked ? 'text-slate-400' : 'text-slate-800'}`}>{feature.name}</h3>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                   {locked ? `Requires ${feature.minPackage}` : 'Active Access'}
                </span>
              </div>
            );
          })}
        </div>

        {/* --- RECENT SUBMISSIONS SECTION --- */}
        <div className="mt-16 border-t border-slate-100 pt-10 px-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
            Recent Activity Feed
          </h3>
          
          <div className="space-y-4">
            {userData?.recentSubmissions?.slice().reverse().map((sub: any, i: number) => (
              <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all group animate-in slide-in-from-bottom-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <p className="text-[15px] leading-relaxed font-medium text-slate-700">
                      Recent student <span className="text-emerald-600 font-black italic underline decoration-emerald-200 uppercase tracking-tighter">"{sub.studentName || 'N/A'}"</span> tar shokol documents submit korlo, ekhon seta <span className="font-black text-slate-900 underline decoration-blue-300">Compliance Team</span>-er kache review-te ache.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                        Ref: {sub.passportNo || 'No Passport'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                        {sub.submittedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-l border-slate-50 pl-6">
                    <div className="text-right hidden md:block">
                       <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Live Status</p>
                       <div className="flex items-center justify-end gap-1.5 mt-1">
                         <div className={`w-2 h-2 rounded-full ${sub.status === 'Pending' ? 'bg-orange-400 animate-pulse' : 'bg-emerald-500'}`}></div>
                         <span className={`text-[10px] font-black uppercase tracking-tighter ${sub.status === 'Pending' ? 'text-orange-500' : 'text-emerald-600'}`}>
                           {sub.status || 'Pending'}
                         </span>
                       </div>
                    </div>

                    <button 
                      onClick={() => generateCombinedPDF(sub)}
                      className="bg-slate-900 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-emerald-600 hover:-translate-y-1 transition-all shadow-xl shadow-slate-100 flex items-center gap-2"
                    >
                      <FileText size={14} className="group-hover:rotate-12 transition-transform" /> 
                      Bistatrito Dekhte Click koro
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!userData?.recentSubmissions?.length && (
              <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.3em]">No applications recorded yet</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- FEATURE OVERLAYS --- */}
      {activeFeature === 'ai_assessment' && <AIAssessment isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'cloudinary' && <CloudManager isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'tracking' && <TrackingSystem isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'mail_alerts' && <MailAlerts isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'invoicing' && <SmartInvoicing isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'compliance' && <Compliance isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'marketing' && <MarketingStudio isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'qr_tracking' && <QRTracking isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'ticketing' && <Ticketing isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'support' && <Support isOpen={true} onClose={() => setActiveFeature(null)} />}
    </div>
  );
};

export default Dashboard;