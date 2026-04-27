import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, CheckCircle2,
  Clock, LayoutDashboard, Settings, Search, Download
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

  // 1. Logic: Feature Suite with Package Constraints
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
    doc.setFontSize(20);
    doc.text("EDU-STREAM B2B HUB", 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Student: ${sub.studentName}`, 20, 40);
    doc.text(`Passport: ${sub.passportNo || 'N/A'}`, 20, 50);
    doc.text(`Status: ${sub.status || 'Processing'}`, 20, 60);
    doc.save(`${sub.studentName}_Report.pdf`);
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-cyan-500 font-bold">Loading MNC Portal...</div>;

  return (
    <div className="flex min-h-screen w-full bg-[#F3F7F9] font-sans text-slate-600 overflow-x-hidden">
      
      {/* SIDEBAR - Slim & Smart */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen shrink-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-100 italic font-black">E</div>
          <span className="text-xl font-bold text-slate-800 tracking-tight italic">EduStream</span>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Student Files" },
            { icon: FileText, label: "Commissions" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${item.active ? 'bg-cyan-50 text-cyan-600 font-semibold' : 'hover:bg-slate-50 text-slate-400'}`}>
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER - Balanced Spacing */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 lg:px-16 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Hi, {userData?.companyName || 'rakhi'}!</h2>
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mt-1 italic">Agency Partner Portal</p>
          </div>
          <div className="flex items-center gap-6">
             <button onClick={() => setActiveFeature('cloudinary')} className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-cyan-100 transition-all flex items-center gap-2 active:scale-95">
                <Plus size={16} /> Add New Student
             </button>
          </div>
        </header>

        {/* CONTENT - Ultra Wide Padding */}
        <div className="p-10 lg:p-16 space-y-10 w-full max-w-[1800px] mx-auto">
          
          {/* Stats Bar - Clean Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              { label: 'Active Students', value: userData?.stats?.totalFiles || '245', icon: Users, trend: '+12%' },
              { label: 'Files in Process', value: userData?.stats?.processing || '89', icon: Clock, trend: '+5%' },
              { label: 'Completed', value: userData?.stats?.success || '156', icon: CheckCircle2, trend: '+18%' },
              { label: 'Success Rate', value: userData?.stats?.revenue || '94%', icon: BarChart3, trend: '+3%' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-cyan-50 text-cyan-500 rounded-2xl"><stat.icon size={24} /></div>
                  <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                </div>
                <h4 className="text-4xl font-bold text-slate-800">{stat.value}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            
            {/* Activity List - Readable & Clickable */}
            <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10">
              <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-6">
                <h3 className="font-bold text-xl text-slate-800 tracking-tight">Recent Status Updates</h3>
                <button className="text-cyan-600 text-xs font-bold hover:underline">View All Activity →</button>
              </div>

              <div className="space-y-4">
                {userData?.recentSubmissions?.length > 0 ? (
                  userData.recentSubmissions.slice(0, 5).reverse().map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-cyan-500 group-hover:text-white transition-all font-bold">
                          {(sub.studentName || "S").charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                             <span className="text-cyan-600 font-bold">{sub.studentName}</span> has submitted their file for review.
                          </p>
                          <div className="flex gap-4 mt-2">
                             <button onClick={() => generateStudentPDF(sub)} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-cyan-600 flex items-center gap-1">
                                <Download size={12}/> Download Summary PDF
                             </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-cyan-50 text-cyan-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase italic">In Review</span>
                        <p className="text-[9px] font-bold text-slate-300 mt-2 uppercase">Just Now</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-300 italic text-sm">No activity found.</div>
                )}
              </div>
            </div>

            {/* Quick Actions & AI */}
            <div className="space-y-8">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6 text-center text-sm uppercase tracking-widest">Quick Actions</h3>
                <div className="space-y-3">
                   <button onClick={() => setActiveFeature('cloudinary')} className="w-full py-4 bg-cyan-500 text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-cyan-100 hover:bg-cyan-600 transition-all">Add New Student</button>
                   <button onClick={() => setActiveFeature('cloudinary')} className="w-full py-4 border border-cyan-100 text-cyan-600 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-cyan-50 transition-all">Upload Documents</button>
                   <button className="w-full py-4 border border-slate-100 text-slate-400 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">Download Reports</button>
                </div>
              </div>

              <div className="bg-[#0A192F] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl group">
                 <h3 className="text-xl font-bold mb-2">AI Assistant Ready</h3>
                 <p className="text-xs text-slate-400 mb-8 leading-relaxed">Instant student eligibility assessment & tracking.</p>
                 <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Launch AI</button>
                 <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>

          {/* Service Suite - Clean Grid */}
          <div className="pt-10">
            <h3 className="font-bold text-xl text-slate-800 mb-8 italic tracking-tight">Partner B2B Service Suite</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {allFeatures.map((feature) => {
                const locked = isFeatureLocked(feature.minPackage);
                return (
                  <div key={feature.id} onClick={() => !locked && setActiveFeature(feature.id)}
                    className={`p-8 rounded-[2rem] border transition-all duration-300 ${locked ? 'bg-slate-50 opacity-40 grayscale' : 'bg-white hover:shadow-xl hover:-translate-y-1 hover:border-cyan-100 cursor-pointer shadow-sm'}`}>
                    <div className={`mb-4 p-4 rounded-xl w-fit ${locked ? 'bg-slate-100 text-slate-300' : 'bg-cyan-50 text-cyan-500'}`}>
                      <feature.icon size={22} />
                    </div>
                    <h3 className="font-bold text-xs text-slate-800 mb-1">{feature.name}</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{locked ? `Upgrade Required` : 'Active Access'}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {activeFeature === 'cloudinary' && <CloudManager isOpen={true} onClose={() => setActiveFeature(null)} />}
      {activeFeature === 'ai_assessment' && <AIAssessment isOpen={true} onClose={() => setActiveFeature(null)} />}
    </div>
  );
};

export default Dashboard;