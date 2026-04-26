import React, { useState } from 'react';
import { Zap, ArrowRight, CheckCircle2, CloudUpload, QrCode, Mail, Plane, Users, BarChart3, Palette, FileText, Globe, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // আপনার সবকটি আকর্ষণীয় ফিচার এখানে লিস্ট করা হলো
  const allFeatures = [
    { icon: <Zap />, title: "AI Assessment Hub", desc: "Instant eligibility checker with downloadable AI-generated PDF reports for students." },
    { icon: <CloudUpload />, title: "Cloudinary Manager", desc: "Secure 5-slot PDF upload system directly synced with Cloudinary for every student file." },
    { icon: <BarChart3 />, title: "20-Step Tracking", desc: "End-to-end tracking from 'File Start' to 'University Reached' with granular status updates." },
    { icon: <Bell />, title: "Auto Mail Alerts", desc: "Every compliance update triggers an automated email to the student and partner instantly." },
    { icon: <FileText />, title: "Smart Invoicing", desc: "Generate file submission invoices and financial reports automatically within the portal." },
    { icon: <Users />, title: "Staff & Compliance", desc: "Task management and real-time monitoring of your team's workflow and compliance." },
    { icon: <Palette />, title: "Marketing Studio", desc: "Canva-style design tool, multi-platform campaign launcher, and AI content writer." },
    { icon: <QrCode />, title: "QR Student Tracking", desc: "Unique QR codes for every student to track their own file progress without login." },
    { icon: <Plane />, title: "Integrated Ticketing", desc: "Real-time flight search and pricing API. Request and manage air tickets within the ERP." },
    { icon: <Globe />, title: "Before Departure", desc: "Automated pre-departure checklists, orientation materials, and travel guides for students." },
    { icon: <Users />, title: "After Arrival Support", desc: "Airport pickup coordination, accommodation booking, and local support tracking." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#0A192F]">
      {/* 1. Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-[#14B8A6] flex items-center gap-2">
          <div className="w-8 h-8 bg-[#14B8A6] rounded-lg flex items-center justify-center text-white text-lg font-bold">E</div>
          EduConsult AI
        </div>
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <a href="#features" className="hover:text-[#14B8A6] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#14B8A6] transition-colors">Pricing</a>
          <a href="#demo" className="hover:text-[#14B8A6] transition-colors">Demo</a>
        </div>
        <Link to="/login">
          <button className="bg-[#14B8A6] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0D9488] transition-all shadow-md shadow-teal-100">
            Start Free Trial
          </button>
        </Link>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-20 pb-20 px-6 text-center max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#14B8A6] mb-8">
          <Zap size={16} fill="currentColor" />
          <span className="text-sm font-semibold tracking-wide uppercase">The Ultimate Processing Hub ERP</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-[1.1]">
          Global Agency <span className="text-[#14B8A6]">Operating System</span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-500 text-xl mb-12 leading-relaxed">
          From AI Eligibility Assessment to Air Ticketing—manage your entire student consultancy business with real-time tracking and automated compliance.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link to="/login">
            <button className="px-10 py-4 bg-[#14B8A6] text-white rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg shadow-teal-200 hover:scale-105 transition-all">
              Get Started Free <ArrowRight size={22} />
            </button>
          </Link>
        </div>
      </section>

      {/* 3. Detailed Features Section */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for <span className="text-[#14B8A6]">Modern Agencies</span></h2>
            <p className="text-gray-500">Every tool you need to process files 10x faster</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-[#14B8A6] rounded-xl flex items-center justify-center mb-6 text-white group-hover:rotate-6 transition-transform shadow-lg shadow-teal-100">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Simple, Transparent <span className="text-[#14B8A6]">Pricing</span></h2>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-[#0A192F]' : 'text-gray-400'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-7 bg-gray-200 rounded-full relative p-1 transition-all"
              >
                <div className={`w-5 h-5 bg-[#14B8A6] rounded-full transition-all ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
              <span className={`font-semibold ${billingCycle === 'yearly' ? 'text-[#0A192F]' : 'text-gray-400'}`}>Yearly <span className="text-xs bg-teal-100 text-[#14B8A6] px-2 py-0.5 rounded-full ml-1 font-bold">Save 20%</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {[
              { 
                plan: "Starter", 
                price: billingCycle === 'monthly' ? "49" : "39", 
                features: ["Up to 50 Student Files", "AI Assessment Hub", "Basic File Tracking", "Email Notifications", "Cloudinary Storage (5 slots)"] 
              },
              { 
                plan: "Professional", 
                price: billingCycle === 'monthly' ? "99" : "79", 
                popular: true,
                features: ["Unlimited Student Files", "Full Compliance Hub", "Marketing Design Studio", "QR Code Tracking", "Integrated Ticketing", "Priority Support"] 
              },
              { 
                plan: "Enterprise", 
                price: "Custom", 
                features: ["Multi-Branch Management", "Custom API Integration", "White-label Portal", "Before & After Departure Support", "Dedicated Account Manager"] 
              }
            ].map((p, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] border transition-all ${p.popular ? 'border-[#14B8A6] shadow-2xl shadow-teal-100 lg:scale-105 bg-white relative z-10' : 'border-gray-100 bg-white hover:border-teal-200'}`}>
                {p.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#14B8A6] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</span>}
                <h3 className="text-xl font-bold mb-2">{p.plan}</h3>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-[#0A192F]">${p.price}</span>
                  {p.price !== "Custom" && <span className="text-gray-500 font-medium">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>}
                </div>
                <ul className="space-y-4 mb-10 text-gray-600">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 size={18} className="text-[#14B8A6] shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${p.popular ? 'bg-[#14B8A6] text-white hover:bg-[#0D9488] shadow-lg shadow-teal-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <div className="flex justify-center gap-8 mb-6 font-medium text-gray-600">
          <a href="#" className="hover:text-[#14B8A6]">Privacy Policy</a>
          <a href="#" className="hover:text-[#14B8A6]">Terms of Service</a>
          <a href="#" className="hover:text-[#14B8A6]">Contact Support</a>
        </div>
        <p className="text-gray-400 text-sm">© 2026 EduConsult AI. Built for Professional Study Abroad Teams.</p>
      </footer>
    </div>
  );
};

export default LandingPage;