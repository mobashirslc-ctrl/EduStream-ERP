import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Zap, Camera, BarChart3, Bell, 
  Users, Globe, Database, ShieldCheck, MessageSquare, CheckCircle2,
  Clock, LayoutDashboard, Settings, Search
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for UI preview
  const userData = {
    companyName: "Rakhi",
    package: "Professional",
    stats: { totalFiles: 245, processing: 89, success: 156, revenue: "94%" },
    recentSubmissions: [
      { id: 1, studentName: "Md. Karim Rahman", docs: 12, time: "5 minutes ago", status: "Under Compliance Review" },
      { id: 2, studentName: "Fatima Akter", docs: 10, time: "15 minutes ago", status: "Initial Verification" },
      { id: 3, studentName: "Sabbir Ahmed", docs: 15, time: "32 minutes ago", status: "Document Processing" }
    ]
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F3F7F9] font-sans text-slate-600">
      
      {/* 1. Sidebar - Slim & Elegant */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-white">
            <Globe size={24} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">EduConsult AI</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Users, label: "Students" },
            { icon: FileText, label: "Reports" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${item.active ? 'bg-cyan-50 text-cyan-600 font-semibold' : 'hover:bg-slate-50 text-slate-400'}`}>
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 2. Main Body */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        
        {/* Header - Clean & Simple */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Client Dashboard</h2>
            <p className="text-xs text-slate-400">Welcome back! Here's what's happening with your agency.</p>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full"><Bell size={20}/></button>
             <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>
             <p className="text-sm font-semibold text-slate-700">← Back to Home</p>
          </div>
        </header>

        <div className="p-10 space-y-8">
          
          {/* Stats Grid - Light & Spaced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Active Students', value: '245', icon: Users, trend: '+ 12%' },
              { label: 'Files in Process', value: '89', icon: FileText, trend: '+ 5%' },
              { label: 'Completed', value: '156', icon: CheckCircle2, trend: '+ 18%' },
              { label: 'Success Rate', value: '94%', icon: BarChart3, trend: '+ 3%' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:border-cyan-200 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-cyan-50 text-cyan-500 rounded-xl group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <stat.icon size={22} />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                </div>
                <h4 className="text-3xl font-bold text-slate-800">{stat.value}</h4>
                <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Recent Status Updates - Wide & Readable */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                <div className="p-2 bg-cyan-50 text-cyan-500 rounded-lg"><Bell size={18}/></div>
                <div>
                    <h3 className="font-bold text-slate-800">Recent Status Updates</h3>
                    <p className="text-[10px] text-slate-400">Latest file submissions and activities</p>
                </div>
              </div>

              <div className="p-6 divide-y divide-slate-50">
                {userData.recentSubmissions.map((sub, i) => (
                  <div key={i} className="py-6 first:pt-0 last:pb-0 flex items-start justify-between group">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          <span className="text-slate-900">{sub.studentName}</span> has submitted their file with {sub.docs} documents
                        </p>
                        <p className="text-xs text-slate-400 mt-1">The file is now with the compliance team for review</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="bg-cyan-50 text-cyan-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase italic">{sub.status}</span>
                          <button className="text-cyan-600 text-[10px] font-bold hover:underline">Click here to check details →</button>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-300 font-medium flex items-center gap-1">
                      <Clock size={12}/> {sub.time}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 text-xs font-bold text-cyan-600 border-t border-slate-50 hover:bg-slate-50 transition-all rounded-b-2xl">
                View All Notifications —
              </button>
            </div>

            {/* Side Column - Quick Actions & AI */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {["Add New Student", "Upload Documents", "View Reports"].map((action, i) => (
                    <button key={i} className={`w-full py-3 rounded-xl text-sm font-semibold transition-all border ${i === 0 ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-100 hover:bg-cyan-600' : 'bg-white text-cyan-600 border-cyan-100 hover:bg-cyan-50'}`}>
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-cyan-600 rounded-2xl p-6 text-white shadow-xl shadow-cyan-100 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">AI Assistant Ready</h3>
                  <p className="text-xs text-cyan-100 leading-relaxed mb-6">Get instant help with student assessments and eligibility checks</p>
                  <button className="w-full py-3 bg-white text-cyan-600 rounded-xl text-sm font-bold shadow-sm hover:bg-cyan-50 transition-all">
                    Launch AI Assistant
                  </button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;