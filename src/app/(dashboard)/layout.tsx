"use client"; // যেহেতু ইন্টারঅ্যাক্টিভ এলিমেন্ট আছে
import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';
import TrialBanner from "@/components/dashboard/TrialBanner"; // সঠিক ইমপোর্ট

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // আপনার ড্যাশবোর্ড মেনু আইটেম
  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: Users, label: "Students" },
    { icon: FileText, label: "Applications" },
    { icon: Settings, label: "Settings" },
  ];

  // ট্রায়াল ইউজার চেক (পরবর্তীতে ডাটাবেজ থেকে আসবে)
  const isTrialUser = true; 

  return (
    <div className="min-h-screen flex flex-col">
      {/* ১. ট্রায়াল ব্যানার: এটি সবার উপরে থাকবে */}
      {isTrialUser && <TrialBanner />}
      
      <div className="flex flex-1 h-screen overflow-hidden">
        {/* ২. সাইডবার */}
        <aside className="w-64 bg-[#0A192F] text-white p-6 flex flex-col shrink-0">
          <div className="text-xl font-bold text-[#14B8A6] mb-10 px-2">EduStream AI</div>
          
          <nav className="flex-1 space-y-2">
            {menuItems.map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  item.active ? 'bg-[#14B8A6] text-white' : 'hover:bg-white/5 text-gray-400'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 text-gray-400 hover:text-red-400 cursor-pointer flex items-center gap-3 p-3">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </div>
        </aside>

        {/* ৩. মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <header className="flex justify-between items-center p-8 pb-0">
            <h1 className="text-2xl font-bold text-[#0A192F]">Welcome back, Admin</h1>
            <div className="w-10 h-10 bg-[#14B8A6] rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold text-white">
              M
            </div>
          </header>
          
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;