import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, CheckCircle2,
  Clock, ArrowRight, LayoutDashboard, Settings
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { jsPDF } from "jspdf";

// Components 
import CloudManager from '../components/dashboard/features/CloudManager';
import AIAssessment from '../components/dashboard/features/AIAssessment';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // 1. Requirement: Partner Service Suite with Package Logic
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
    // Real-time user data sync
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      if (doc.exists()) setUserData(doc.data());
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // 2. Requirement: Dynamic Package Authorization
  const isFeatureLocked = (minPackage: string) => {
    if (userData?.status === 'trial') return false; 
    const packages = ['Basic', 'Standard', 'Professional'];
    const userPkg = userData?.package || 'Basic';
    return packages.indexOf(userPkg) < packages.indexOf(minPackage);
  };

  // 3. Requirement: PDF Report Generation
  const generateStudentPDF = (sub: any) => {
    const doc = new jsPDF();
    const sName = sub.studentName || "New Student";
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // Emerald color
    doc.text("EDU-STREAM B2B HUB", 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text(`Student File Report - ${sub.id || 'Draft'}`, 20, 35);
    
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(`Company: ${userData?.companyName || 'N/A'}`, 20, 50);
    doc.text(`Student Name: ${sName}`, 20, 60);
    doc.text(`Passport No: ${sub.passportNo || 'N/A'}`, 20, 70);
    doc.text(`Status: ${sub.status || 'In Review'}`, 20, 80);
    
    if (sub?.documents) {
        doc.text("Uploaded Documents:", 20, 100);
        Object.entries(sub.documents).forEach(([key, url]: any, index) => {
            doc.text(`- ${key}: Attached`, 25, 110 + (index * 8));
        });
    }
    doc.save(`${sName}_Status_Report.pdf`);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-500">Initializing B2B Hub...</div>;

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAF8] overflow-x-hidden font-sans">
      
      {/* SIDEBAR - Fixed width, high density */}
      <aside className="w-20 lg:w-72 bg-white border-r border-slate-100 flex flex-col shrink-0 sticky top-0 h-screen z-20">
        <div className="p-8">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-100">E</div>
             <h1 className="hidden lg:block text-2xl font-black italic tracking-tighter text-slate-800">EduStream</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-6 space-y-3">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Student Files" },
            { icon: FileText, label: "Commissions" },
            { icon: Settings, label: "Agency Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={22} />
              <span className="hidden lg:block font-bold text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER - Full Width */}
        <header className="h-24 bg-white border-b border-slate-50 flex items-center justify-between px-8 lg:px-16 sticky top-0 z-10 w-full">
          <div>
             <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1">MNC Level B2B Portal</p>
             <h2 className="text-2xl font-black text-slate-800 italic uppercase">Welcome, {userData?.companyName || 'Partner'}!</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
                <p className="text-xs font-black text-slate-800">{userData?.package || 'Basic'} Plan</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase">Status: Active</p>
            </div>
            <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-emerald-100 transition-all flex items-center gap-2 active:scale-95">
                <Plus size={20} /> Add New Student
            </button>
          </div>
        </header>

        {/* DASHBOARD BODY - Wide Layout */}
        <div className="p-8 lg:p-16 space-y-12 w-full">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              { label: 'Total Files', value: userData?.stats?.totalFiles || '245', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Processing', value: userData?.stats?.processing || '89', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Successful', value: userData?.stats?.success || '156', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50' },
              { label: 'Revenue', value: userData?.stats?.revenue || '$12k', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm hover:shadow-xl transition-all">
                <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}><stat.icon size={32} /></div>
                <h4 className="text-5xl font-black text-slate-800 mb-2">{stat.value}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Activity & AI Section */}
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-12">
            
            {/* Dynamic Activity List */}
            <div className="2xl:col-span-2 bg-white rounded-[3.5rem] border border-slate-50 p-12 shadow-sm">
              <div className="flex items-center justify-between mb-12 border-b border-slate-50 pb-8">
                <h3 className="font-black text-2xl text-slate-800 italic">Recent Processing Updates</h3>
                <button className="text-emerald-600 font-bold text-sm hover:underline">Full Database →</button>
              </div>

              <div className="space-y-6">
                {userData?.recentSubmissions?.length > 0 ? (
                  userData.recentSubmissions.slice(0, 5).reverse().map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-8 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-3xl font-black text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          {(sub.studentName || "S").charAt(0)}
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-800">
                             Student: <span className="text-emerald-600 font-black">{sub.studentName}</span>
                          </p>
                          <div className="flex gap-4 mt-2">
                             <button onClick={() => generateStudentPDF(sub)} className="text-cyan-600 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                                <FileText size={14}/> Download Report
                             </button>
                             <span className="text-slate-300 text-xs font-bold italic">Passport: {sub.passportNo || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-50 text-emerald-600 text-xs font-black px-6 py-2 rounded-full uppercase tracking-tighter">In Progress</span>
                        <p className="text-[10px] font-bold text-slate-300 mt-3 uppercase tracking-widest">{sub.submittedAt || 'Recent'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 opacity-40 italic font-bold">No active student files found.</div>
                )}
              </div>
            </div>

            {/* AI Assistant Card */}
            <div className="space-y-10">
              <div className="bg-[#0A192F] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10">
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8"><Zap size={32} /></div>
                    <h3 className="text-3xl font-black mb-4 italic">AI Eligibility</h3>
                    <p className="text-slate-400 leading-relaxed mb-10 font-medium">Verify university requirements instantly using our AI model.</p>
                    <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-6 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all">
                       Open AI Console
                    </button>
                 </div>
                 <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
              </div>
              
              {/* Quick Docs Action */}
              <div className="bg-white rounded-[3.5rem] border border-slate-50 p-12 shadow-sm text-center">
                 <h3 className="font-black text-xl mb-6">Partner Quick Action</h3>
                 <button onClick={() => setActiveFeature('cloudinary')} className="w-full py-5 border-2 border-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                   <Camera size={18}/> Manage Cloud Storage
                 </button>
              </div>
            </div>
          </div>

          {/* Full-Width Service Suite */}
          <div className="pt-10">
            <h3 className="font-black text-2xl italic text-slate-800 mb-10 border-l-8 border-emerald-500 pl-6 uppercase tracking-tighter">Partner B2B Service Suite</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
              {allFeatures.map((feature) => {
                const locked = isFeatureLocked(feature.minPackage);
                return (
                  <div key={feature.id} onClick={() => !locked && setActiveFeature(feature.id)}
                    className={`p-10 rounded-[3rem] border transition-all duration-500 ${locked ? 'bg-slate-50 opacity-50 grayscale' : 'bg-white hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-200 cursor-pointer shadow-sm'}`}>
                    <div className={`mb-6 p-5 rounded-2xl w-fit ${locked ? 'bg-slate-100 text-slate-300' : 'bg-emerald-50 text-emerald-500'}`}>
                      <feature.icon size={28} />
                    </div>
                    <h3 className="font-black text-sm text-slate-800 mb-2">{feature.name}</h3>
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{locked ? `Upgrade to ${feature.minPackage}` : 'Active Access'}</p>
                        {locked && <Lock size={14} className="text-slate-300" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Overlays */}
      {activeFeature === 'cloudinary' && <CloudManager isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'ai_assessment' && <AIAssessment isOpen={true} onClose={() => setActiveFeature(null)} />}
    </div>
  );
};

export default Dashboard;