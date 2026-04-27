import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, Clock, ArrowRight, CheckCircle2
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { jsPDF } from "jspdf";

// Feature Components (Ensure these imports match your file structure)
import CloudManager from '../components/dashboard/features/CloudManager';
import AIAssessment from '../components/dashboard/features/AIAssessment';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const brandColor = "#10b981"; 

  // --- 10 FEATURES CONFIGURATION ---
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

  // --- LOCK LOGIC ---
  const isFeatureLocked = (minPackage: string) => {
    if (userData?.status === 'trial') return false; 
    const packages = ['Basic', 'Standard', 'Professional'];
    const userPkg = userData?.package || 'Basic';
    return packages.indexOf(userPkg) < packages.indexOf(minPackage);
  };

  const generateCombinedPDF = (sub: any) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(16, 185, 129);
    doc.text("EDUCONSULT B2B HUB - STUDENT FILE", 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 28, { align: 'center' });

    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text(`Student Name: ${sub.studentName || 'N/A'}`, 20, 45);
    doc.text(`Passport: ${sub.passportNo || 'N/A'}`, 20, 52);
    doc.text(`University: ${sub.universityName || 'N/A'}`, 20, 59);
    
    doc.setFontSize(14);
    doc.text("Document Links:", 20, 80);
    let y = 90;
    Object.entries(sub.documents || {}).forEach(([key, url]: any) => {
      doc.setFontSize(10);
      doc.setTextColor(0, 102, 204);
      doc.text(`> ${key}: Click to Open File`, 25, y);
      doc.link(25, y - 4, 80, 6, { url });
      y += 10;
    });
    doc.save(`${sub.studentName}_Summary.pdf`);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-500">Loading Dashboard...</div>;

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col items-center lg:items-start p-4 lg:p-6 shrink-0">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black">E</div>
          <h1 className="hidden lg:block text-lg font-black tracking-tighter uppercase italic">EduStream</h1>
        </div>
        <nav className="flex-1 space-y-4 w-full">
          {[
            { icon: Zap, label: "Overview", active: true },
            { icon: Users, label: "Students" },
            { icon: FileText, label: "Reports" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${item.active ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={20} />
              <span className="hidden lg:block font-bold text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-end">
           <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">B2B Partner Portal</p>
              <h2 className="text-3xl font-black italic">Hi, {userData?.companyName || 'Partner'}!</h2>
           </div>
           <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-200 flex items-center gap-2 hover:-translate-y-1 transition-all">
             <Plus size={18} /> Add New Student
           </button>
        </div>

        {/* 1. Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Students', value: '245', growth: '+12%', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Files in Process', value: '89', growth: '+5%', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Completed', value: '156', growth: '+18%', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50' },
            { label: 'Success Rate', value: '94%', growth: '+3%', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}><stat.icon size={24} /></div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{stat.growth}</span>
              </div>
              <h4 className="text-3xl font-black mb-1">{stat.value}</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 2. Middle Section: Recent Feed + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Recent Status Updates */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center"><Bell size={20} /></div>
              <div>
                 <h3 className="font-black text-lg">Recent Status Updates</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latest file submissions and activities</p>
              </div>
            </div>

            <div className="space-y-6">
              {userData?.recentSubmissions?.slice().reverse().map((sub: any, i: number) => (
                <div key={i} className="flex items-start justify-between group">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-black group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        <span className="text-emerald-600 underline underline-offset-4 decoration-emerald-100">{sub.studentName}</span> has submitted their file for review.
                      </p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1">Under Compliance Review</p>
                      <button onClick={() => generateCombinedPDF(sub)} className="text-cyan-600 text-[10px] font-black uppercase tracking-widest mt-2 block hover:underline">
                        Check Details →
                      </button>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300"><Clock size={12} className="inline mr-1" /> {sub.submittedAt || 'Recent'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <h3 className="font-black text-lg mb-6">Quick Actions</h3>
              <div className="space-y-3">
                 <button onClick={() => setActiveFeature('cloudinary')} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600">Add New Student</button>
                 <button className="w-full py-4 border-2 border-emerald-100 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest">Upload Documents</button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-[2.5rem] p-8 text-white shadow-xl">
               <h3 className="font-black text-lg mb-2">AI Assistant</h3>
               <p className="text-[11px] opacity-80 leading-relaxed mb-6">Instantly check student eligibility with AI.</p>
               <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest">Launch AI</button>
            </div>
          </div>
        </div>

        {/* 3. Partner Service Suite (10 Features Grid) */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-xl italic text-slate-800">Partner Service Suite</h3>
            <div className="h-px flex-1 bg-slate-100 mx-8"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {allFeatures.map((feature) => {
              const locked = isFeatureLocked(feature.minPackage);
              return (
                <div 
                  key={feature.id} 
                  onClick={() => !locked && setActiveFeature(feature.id)}
                  className={`group relative p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer 
                    ${locked ? 'bg-slate-50 grayscale opacity-60' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1'}`}
                >
                  {locked && <Lock size={12} className="absolute top-4 right-4 text-slate-400" />}
                  <div className={`mb-4 p-3 rounded-2xl w-fit ${locked ? 'bg-slate-100 text-slate-300' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="font-black text-xs tracking-tight mb-1">{feature.name}</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{locked ? `Requires ${feature.minPackage}` : 'Active'}</p>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* --- OVERLAYS --- */}
      {activeFeature === 'cloudinary' && <CloudManager isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'ai_assessment' && <AIAssessment isOpen={true} onClose={() => setActiveFeature(null)} />}
    </div>
  );
};

export default Dashboard;