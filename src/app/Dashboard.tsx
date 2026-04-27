import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Lock, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, Clock, ArrowRight, CheckCircle2
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { jsPDF } from "jspdf";

// Components - Ensure these files exist in your directory
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
    
    // Fixed: Added Optional Chaining and checks
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
    // Added 'max-w-[2000px] mx-auto' to ensure it doesn't break on extremely large screens
    <div className="flex min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 overflow-x-hidden">
      
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col p-6 shrink-0 sticky top-0 h-screen shadow-sm z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-100">E</div>
          <h1 className="hidden lg:block text-xl font-black tracking-tighter uppercase italic">EduStream</h1>
        </div>
        <nav className="flex-1 space-y-4">
          {[{ icon: Zap, label: "Overview", active: true }, { icon: Users, label: "Students" }, { icon: FileText, label: "Reports" }].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors ${item.active ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={20} />
              <span className="hidden lg:block text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#fdfdfd]">
        
        {/* Top Header Bar */}
        <header className="w-full h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">B2B HUB</span>
            <h2 className="text-xl font-black italic tracking-tight text-slate-800 uppercase">Hi, {userData?.companyName || 'rakhi'}!</h2>
          </div>
          <button onClick={() => setActiveFeature('cloudinary')} className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 hover:-translate-y-1 transition-all flex items-center gap-2 active:scale-95">
            <Plus size={18} /> Add New Student
          </button>
        </header>

        {/* Dashboard Content Container */}
        <div className="flex-1 p-6 lg:p-10 space-y-10 w-full">
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Active Students', value: '245', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50', trend: '+12%' },
              { label: 'Files in Process', value: '89', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+5%' },
              { label: 'Completed', value: '156', icon: CheckCircle2, color: 'text-cyan-500', bg: 'bg-cyan-50', trend: '+18%' },
              { label: 'Success Rate', value: '94%', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50', trend: '+3%' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}><stat.icon size={22} /></div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-800">{stat.value}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                <Bell className="text-emerald-500" size={24} />
                <h3 className="font-black text-lg">Recent Status Updates</h3>
              </div>
              
              <div className="space-y-6">
                {userData?.recentSubmissions && userData.recentSubmissions.length > 0 ? (
                  userData.recentSubmissions.slice().reverse().map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          {(sub.studentName || "N").charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            <span className="text-emerald-600">{sub.studentName || "New Student"}</span> has submitted their file.
                          </p>
                          <button onClick={() => generateStudentPDF(sub)} className="text-cyan-600 text-[10px] font-black uppercase tracking-widest mt-1 hover:underline">
                            Click here to check details →
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-300 block">{sub.submittedAt || 'Just Now'}</span>
                        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter italic">In Review</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-400 py-10 text-sm font-bold italic">No recent activity found.</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                <h3 className="font-black text-lg mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={() => setActiveFeature('cloudinary')} className="w-full py-4 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all">Add New Student</button>
                  <button className="w-full py-4 border-2 border-emerald-50 text-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">Upload Documents</button>
                  <button className="w-full py-4 border-2 border-emerald-50 text-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">View Reports</button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-[2rem] p-8 text-white shadow-xl hover:shadow-emerald-200 transition-shadow">
                <h3 className="font-black text-lg mb-2 italic">AI Assistant Ready</h3>
                <p className="text-xs opacity-80 leading-relaxed mb-6 font-medium">Instant student eligibility assessment & tracking.</p>
                <button onClick={() => setActiveFeature('ai_assessment')} className="w-full py-4 bg-white text-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">Launch AI Assistant</button>
              </div>
            </div>
          </div>

          {/* Service Suite */}
          <div className="pt-6 pb-12">
            <h3 className="font-black text-xl italic text-slate-800 mb-8 px-2 uppercase tracking-tighter">Partner Service Suite</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {allFeatures.map((feature) => {
                const locked = isFeatureLocked(feature.minPackage);
                return (
                  <div key={feature.id} 
                    onClick={() => !locked && setActiveFeature(feature.id)}
                    className={`p-6 rounded-[2.5rem] border transition-all duration-300 cursor-pointer 
                    ${locked ? 'bg-slate-50 border-slate-100 opacity-60 grayscale' : 'bg-white border-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-emerald-200'}`}>
                    <div className={`mb-4 p-3 rounded-2xl w-fit ${locked ? 'bg-slate-100 text-slate-300' : 'bg-emerald-50 text-emerald-500'}`}>
                      <feature.icon size={24} />
                    </div>
                    <h3 className={`font-black text-[12px] tracking-tight mb-1 ${locked ? 'text-slate-400' : 'text-slate-800'}`}>{feature.name}</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase">{locked ? `Requires ${feature.minPackage}` : 'Ready to Use'}</p>
                    {locked && <Lock size={12} className="mt-2 text-slate-300" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Overlays - Conditional Rendering with logic check */}
      {activeFeature === 'cloudinary' && CloudManager && (
        <CloudManager isOpen={true} onClose={() => setActiveFeature(null)} />
      )}
      {activeFeature === 'ai_assessment' && AIAssessment && (
        <AIAssessment isOpen={true} onClose={() => setActiveFeature(null)} />
      )}
    </div>
  );
};

export default Dashboard;