import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, CheckCircle2
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { jsPDF } from "jspdf";

// Components
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

  const generateStudentPDF = (sub: any) => {
    const doc = new jsPDF();
    const sName = sub.studentName || "New Student";
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129);
    doc.text("STUDENT FILE SUMMARY", 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(`Student: ${sName}`, 20, 40);
    doc.text(`Passport: ${sub.passportNo || 'N/A'}`, 20, 50);
    
    if (sub?.documents && Object.keys(sub.documents).length > 0) {
        Object.entries(sub.documents).forEach(([key, url]: any, index) => {
            doc.text(`- ${key}: ${url}`, 20, 70 + (index * 10));
        });
    } else {
        doc.text("- No documents uploaded yet.", 20, 70);
    }
    doc.save(`${sName}_File.pdf`);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-500 bg-[#f8fafc]">Loading Agency Portal...</div>;

  return (
    /* Full screen width constraint removed for wide view */
    <div className="flex min-h-screen w-screen bg-[#F8FAF8] overflow-x-hidden font-sans">
      
      {/* 1. Sidebar - Fixed Wide Width */}
      <aside className="w-20 lg:w-72 bg-white border-r border-slate-100 flex flex-col shrink-0 sticky top-0 h-screen z-20">
        <div className="p-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-100">E</div>
             <h1 className="hidden lg:block text-2xl font-black tracking-tighter uppercase italic text-slate-800">EduStream</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {[{ icon: Zap, label: "Overview", active: true }, { icon: Users, label: "Students" }, { icon: FileText, label: "Reports" }].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600 font-bold shadow-sm shadow-emerald-100/50' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={22} />
              <span className="hidden lg:block font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. Main Content - Flex-1 makes it use all remaining horizontal space */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header - Stretches Full Width */}
        <header className="h-24 bg-white border-b border-slate-50 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-10 w-full">
          <div>
             <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1">Agency B2B Hub</p>
             <h2 className="text-2xl font-black text-slate-800 italic uppercase">Hi, {userData?.companyName || 'rakhi'}!</h2>
          </div>
          <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center gap-2">
            <Plus size={20} /> Add New Student
          </button>
        </header>

        {/* Wide Dashboard Body */}
        <div className="p-8 lg:p-12 space-y-12 w-full">
          
          {/* Stats Section - Spread across 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              { label: 'Active Students', value: '245', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Files in Process', value: '89', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Completed', value: '156', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50' },
              { label: 'Success Rate', value: '94%', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                  <stat.icon size={28} />
                </div>
                <h4 className="text-4xl font-black text-slate-800 mb-1">{stat.value}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Activity Section - Wide Layout (2:1 Ratio) */}
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-10">
            
            {/* Recent Submissions (Wide Side) */}
            <div className="2xl:col-span-2 bg-white rounded-[3rem] border border-slate-50 p-10 shadow-sm">
              <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center"><Bell size={20}/></div>
                  <h3 className="font-black text-xl text-slate-800">Recent Status Updates</h3>
                </div>
                <button className="text-emerald-600 font-bold text-sm hover:underline tracking-tight">View All Activity →</button>
              </div>

              <div className="space-y-8">
                {userData?.recentSubmissions && userData.recentSubmissions.length > 0 ? (
                  userData.recentSubmissions.slice().reverse().map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all uppercase">
                          {(sub.studentName || "N").charAt(0)}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-700">
                            <span className="text-emerald-600 font-black">{sub.studentName || "New Student"}</span> has submitted their file for review.
                          </p>
                          <button onClick={() => generateStudentPDF(sub)} className="text-cyan-600 text-[11px] font-black uppercase tracking-widest mt-2 hover:underline">Download Summary PDF →</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">In Review</span>
                        <p className="text-[10px] font-bold text-slate-300 mt-2 uppercase tracking-widest">{sub.submittedAt || 'Just Now'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-400 py-16 text-sm font-bold italic">No recent activity found.</p>
                )}
              </div>
            </div>

            {/* Quick Actions & AI (Narrow Side) */}
            <div className="space-y-8">
              <div className="bg-[#0A192F] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2 italic">AI Assistant</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-8">Get instant eligibility assessments for students.</p>
                    <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all">
                       Launch AI Assistant
                    </button>
                 </div>
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
              </div>

              <div className="bg-white rounded-[3rem] border border-slate-50 p-10 shadow-sm">
                <h3 className="font-black text-xl mb-8 text-slate-800">Quick Actions</h3>
                <div className="space-y-4">
                  <button onClick={() => setActiveFeature('cloudinary')} className="w-full py-4 border-2 border-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all">Upload Student Documents</button>
                  <button className="w-full py-4 border-2 border-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all">Download Reports</button>
                </div>
              </div>
            </div>
          </div>

          {/* Service Suite Section */}
          <div className="pt-6 pb-12">
            <h3 className="font-black text-xl italic text-slate-800 mb-8 uppercase tracking-tighter border-l-4 border-emerald-500 pl-4">Partner Service Suite</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {allFeatures.map((feature) => {
                const locked = isFeatureLocked(feature.minPackage);
                return (
                  <div key={feature.id} onClick={() => !locked && setActiveFeature(feature.id)}
                    className={`p-8 rounded-[2.5rem] border transition-all duration-300 ${locked ? 'bg-slate-50 opacity-60 grayscale' : 'bg-white hover:shadow-xl hover:-translate-y-2 hover:border-emerald-200 cursor-pointer shadow-sm'}`}>
                    <div className={`mb-4 p-4 rounded-2xl w-fit ${locked ? 'bg-slate-100 text-slate-300' : 'bg-emerald-50 text-emerald-500 shadow-sm'}`}>
                      <feature.icon size={24} />
                    </div>
                    <h3 className={`font-black text-[13px] mb-1 ${locked ? 'text-slate-400' : 'text-slate-800'}`}>{feature.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{locked ? `Requires ${feature.minPackage}` : 'Active'}</p>
                    {locked && <Lock size={12} className="mt-3 text-slate-300" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Conditional Rendering Overlays */}
      {activeFeature === 'cloudinary' && CloudManager && <CloudManager isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'ai_assessment' && AIAssessment && <AIAssessment isOpen={true} onClose={() => setActiveFeature(null)} />}
    </div>
  );
};

export default Dashboard;