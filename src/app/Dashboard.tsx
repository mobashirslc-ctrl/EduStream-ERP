import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, Clock, ArrowRight, CheckCircle2
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { jsPDF } from "jspdf";

// Components (Ensure paths are correct)
import CloudManager from '../components/dashboard/features/CloudManager';
import AIAssessment from '../components/dashboard/features/AIAssessment';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const allFeatures = [
    { id: 'ai_assessment', name: 'AI Assessment', icon: Zap, minPackage: 'Basic' },
    { id: 'cloudinary', name: 'Cloud Manager', icon: Camera, minPackage: 'Basic' },
    { id: 'tracking', name: '20-Step Track', icon: BarChart3, minPackage: 'Basic' },
    { id: 'mail_alerts', name: 'Mail Alerts', icon: Bell, minPackage: 'Standard' },
    { id: 'invoicing', name: 'Smart Invoice', icon: FileText, minPackage: 'Standard' },
    { id: 'compliance', name: 'Compliance', icon: Users, minPackage: 'Standard' },
    { id: 'marketing', name: 'Marketing Studio', icon: Globe, minPackage: 'Professional' },
    { id: 'qr_tracking', name: 'QR Tracking', icon: Database, minPackage: 'Professional' },
    { id: 'ticketing', name: 'Ticketing System', icon: ShieldCheck, minPackage: 'Professional' },
    { id: 'support', name: 'Priority Support', icon: MessageSquare, minPackage: 'Professional' },
  ];

  useEffect(() => {
    if (!auth.currentUser) return;
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      if (doc.exists()) setUserData(doc.data());
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isFeatureLocked = (minPackage: string) => {
    if (userData?.status === 'trial') return false; 
    const packages = ['Basic', 'Standard', 'Professional'];
    const userPkg = userData?.package || 'Basic';
    return packages.indexOf(userPkg) < packages.indexOf(minPackage);
  };

  // PDF Generation for Student Files
  const generateStudentPDF = (sub: any) => {
    const doc = new jsPDF();
    const sName = sub.studentName || "Unknown Student";
    
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129);
    doc.text("EDUCONSULT B2B - FILE SUMMARY", 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(`Student Name: ${sName}`, 20, 40);
    doc.text(`Passport No: ${sub.passportNo || 'N/A'}`, 20, 50);
    doc.text(`Submitted On: ${sub.submittedAt || 'N/A'}`, 20, 60);

    doc.setFontSize(14);
    doc.text("Uploaded Documents:", 20, 80);
    
    let y = 90;
    if (sub.documents) {
      Object.entries(sub.documents).forEach(([key, url]: any) => {
        doc.setFontSize(10);
        doc.setTextColor(0, 102, 204);
        doc.text(`> ${key}: Open Document`, 25, y);
        doc.link(25, y - 4, 100, 6, { url });
        y += 10;
      });
    } else {
      doc.text("No documents found.", 25, 90);
    }
    
    doc.save(`${sName}_Summary.pdf`);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-500 animate-pulse">Establishing MNC Connection...</div>;

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] overflow-x-hidden font-sans text-slate-900">
      
      {/* Sidebar - Fixed Height */}
      <aside className="w-20 lg:w-72 bg-white border-r border-slate-200 flex flex-col p-4 lg:p-8 shrink-0 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-200">E</div>
          <h1 className="hidden lg:block text-2xl font-black tracking-tighter uppercase italic text-slate-800">EduStream</h1>
        </div>
        <nav className="flex-1 space-y-6 w-full">
          {[{ icon: Zap, label: "Overview", active: true }, { icon: Users, label: "Students" }, { icon: FileText, label: "Reports" }].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={22} />
              <span className="hidden lg:block font-bold text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area - Full Width */}
      <main className="flex-1 p-6 lg:p-12 space-y-12 max-w-[1600px] mx-auto w-full">
        
        {/* Header */}
        <header className="flex justify-between items-center">
           <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Agency Partner Portal</p>
              <h2 className="text-4xl font-black italic tracking-tight text-slate-800">Hi, {userData?.companyName || 'Partner'}!</h2>
           </div>
           <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-200 flex items-center gap-3 hover:-translate-y-2 transition-all active:scale-95">
             <Plus size={20} /> Add New Student
           </button>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Active Students', value: '245', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Files in Process', value: '89', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Completed', value: '156', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50' },
            { label: 'Success Rate', value: '94%', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl w-fit mb-6`}><stat.icon size={28} /></div>
              <h4 className="text-4xl font-black mb-2">{stat.value}</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Middle Section: Recent Feed + Actions */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          
          {/* Recent Status Updates (Left) */}
          <div className="xl:col-span-2 bg-white rounded-[4rem] border border-slate-100 shadow-xl p-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center"><Bell size={24} /></div>
              <div>
                 <h3 className="font-black text-xl">Recent Status Updates</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Latest student file activities</p>
              </div>
            </div>

            <div className="space-y-8">
              {userData?.recentSubmissions?.slice().reverse().map((sub: any, i: number) => (
                <div key={i} className="flex items-center justify-between group p-4 rounded-[2rem] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  <div className="flex gap-6 items-center">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center font-black text-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      {(sub.studentName || "S").charAt(0)}
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800">
                        <span className="text-emerald-600 underline underline-offset-8 decoration-emerald-200">{sub.studentName || "New Student"}</span> has submitted their file.
                      </p>
                      <button onClick={() => generateStudentPDF(sub)} className="text-cyan-600 text-[11px] font-black uppercase tracking-[0.2em] mt-3 flex items-center gap-2 hover:gap-4 transition-all">
                        Click here to check details <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-300 block uppercase mb-1">{sub.submittedAt || 'Just Now'}</span>
                    <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full italic">In Review</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions (Right) */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl">
              <h3 className="font-black text-xl mb-8 tracking-tight">Quick Actions</h3>
              <div className="space-y-4">
                 <button onClick={() => setActiveFeature('cloudinary')} className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all">Add New Student</button>
                 <button className="w-full py-5 bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Upload Documents</button>
                 <button className="w-full py-5 bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Download Reports</button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-emerald-100">
               <h3 className="font-black text-xl mb-3">AI Assistant Ready</h3>
               <p className="text-xs font-medium opacity-80 leading-relaxed mb-8 uppercase tracking-widest font-bold">Eligibility check & assessment</p>
               <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-5 bg-white text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Launch AI System</button>
            </div>
          </div>
        </section>

        {/* Partner Service Suite (10 Features Grid) */}
        <section className="pt-8 pb-12">
          <div className="flex items-center gap-6 mb-12">
            <h3 className="font-black text-2xl italic text-slate-800">Partner Service Suite</h3>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {allFeatures.map((feature) => {
              const locked = isFeatureLocked(feature.minPackage);
              return (
                <div key={feature.id} onClick={() => !locked && setActiveFeature(feature.id)}
                  className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer 
                    ${locked ? 'bg-slate-50 border-slate-100 grayscale' : 'bg-white border-slate-50 shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:border-emerald-200'}`}>
                  {locked && <Lock size={14} className="absolute top-6 right-6 text-slate-300" />}
                  <div className={`mb-6 p-4 rounded-2xl w-fit transition-all ${locked ? 'bg-slate-100 text-slate-200' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:rotate-12'}`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="font-black text-sm tracking-tighter mb-1">{feature.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{locked ? `Requires ${feature.minPackage}` : 'Active'}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Overlays */}
      {activeFeature === 'cloudinary' && <CloudManager isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'ai_assessment' && <AIAssessment isOpen={true} onClose={() => setActiveFeature(null)} />}
    </div>
  );
};

export default Dashboard;