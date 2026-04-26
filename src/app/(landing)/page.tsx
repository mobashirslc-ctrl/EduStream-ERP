import React, { useState } from 'react';
import { Zap, ArrowRight, CheckCircle2, CloudUpload, QrCode, Plane, Users, BarChart3, Palette, FileText, Globe, Bell, X, CreditCard, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<any>(null); 
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const allFeatures = [
    { icon: <Zap />, title: "AI Assessment Hub", desc: "Instant eligibility checker with downloadable AI-generated PDF reports." },
    { icon: <CloudUpload />, title: "Cloudinary Manager", desc: "Secure 5-slot PDF upload system synced with Cloudinary for every student file." },
    { icon: <BarChart3 />, title: "20-Step Tracking", desc: "End-to-end tracking from 'File Start' to 'University Reached' with updates." },
    { icon: <Bell />, title: "Auto Mail Alerts", desc: "Compliance updates trigger automated emails to student and partner instantly." },
    { icon: <FileText />, title: "Smart Invoicing", desc: "Generate file submission invoices and financial reports automatically." },
    { icon: <Users />, title: "Staff & Compliance", desc: "Task management and real-time monitoring of your team's workflow." },
    { icon: <Palette />, title: "Marketing Studio", desc: "Canva-style tool, multi-platform campaign launcher, and AI writer." },
    { icon: <QrCode />, title: "QR Student Tracking", desc: "Unique QR codes for students to track progress without login." },
    { icon: <Plane />, title: "Integrated Ticketing", desc: "Real-time flight search and pricing API managed within the ERP." }
  ];

  const pricingPlans = [
    { 
      plan: "Starter", 
      price: billingCycle === 'monthly' ? "49" : "39", 
      features: [
        "Up to 50 Student Files", 
        "AI Assessment Hub", 
        "Compliance Management (Status Tracking)", 
        "Email Notifications", 
        "Cloudinary Storage (5 slots)"
      ] 
    },
    { 
      plan: "Professional", 
      price: billingCycle === 'monthly' ? "99" : "79", 
      popular: true,
      features: [
        "Unlimited Student Files", 
        "All Staff Management", 
        "Full Compliance Hub", 
        "Marketing Design Studio", 
        "Integrated Ticketing", 
        "QR Code Tracking"
      ] 
    },
    { 
      plan: "Enterprise", 
      price: "Custom", 
      features: [
        "Multi-Branch Management", 
        "Custom API Integration", 
        "White-label Portal", 
        "Before & After Departure Support", 
        "24/7 Dedicated Support"
      ] 
    }
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
          <button className="bg-[#14B8A6] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0D9488] transition-all">
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
          From AI Eligibility Assessment to Air Ticketing—manage your entire student consultancy business with real-time tracking.
        </p>
        <div className="flex justify-center">
          <Link to="/login">
            <button className="px-10 py-4 bg-[#14B8A6] text-white rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
              Get Started Free <ArrowRight size={22} />
            </button>
          </Link>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for <span className="text-[#14B8A6]">Modern Agencies</span></h2>
            <p className="text-gray-500">Every tool you need to process files 10x faster</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allFeatures.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-[#14B8A6] rounded-xl flex items-center justify-center mb-6 text-white group-hover:rotate-6 transition-transform">
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
            {pricingPlans.map((p, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedPlan(p)}
                className={`p-10 rounded-[2.5rem] border transition-all cursor-pointer ${
                  selectedPlan?.plan === p.plan 
                  ? 'border-[#14B8A6] shadow-2xl shadow-teal-100 lg:scale-105 bg-white relative z-10' 
                  : 'border-gray-100 bg-white hover:border-teal-200 opacity-80 hover:opacity-100'
                }`}
              >
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
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedPlan(p); setShowPaymentModal(true); }}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    selectedPlan?.plan === p.plan ? 'bg-[#14B8A6] text-white shadow-lg shadow-teal-200' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {selectedPlan?.plan === p.plan ? 'Get Started Now' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Manual Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowPaymentModal(false)} className="absolute right-6 top-6 text-gray-400 hover:text-black"><X /></button>
            <h2 className="text-2xl font-bold mb-2">Checkout</h2>
            <p className="text-gray-500 mb-6">Subscribing to: <span className="text-[#14B8A6] font-bold">{selectedPlan?.plan} Plan</span></p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Payment Method</label>
                <select className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-teal-500" onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                  <option value="">Choose Method...</option>
                  <option value="bkash">MFS (bKash/Nagad/Rocket)</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
              {paymentMethod === 'bkash' && (
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <p className="text-sm font-medium text-teal-800 mb-2 font-bold text-center underline">Send Money: 017XXXXXXXX (Personal)</p>
                  <input type="text" placeholder="Enter Transaction ID" className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#14B8A6]" />
                </div>
              )}
              {paymentMethod === 'bank' && (
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <p className="text-xs font-medium text-teal-800 mb-2">A/C: EduConsult Ltd, City Bank, #123456789</p>
                  <label className="block text-[10px] font-bold text-teal-600 mb-1 uppercase text-center">Upload Payment Slip</label>
                  <input type="file" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-600 file:text-white" />
                </div>
              )}
              <button className="w-full py-4 bg-[#0A192F] text-white rounded-xl font-bold mt-4 hover:bg-black transition-all">Confirm Payment</button>
              <p className="text-[10px] text-center text-gray-400 mt-2">আমাদের টিম পেমেন্ট ভেরিফাই করে ১-২ ঘণ্টার মধ্যে আপনার মডিউলগুলো আনলক করে দেবে।</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Footer Links */}
      <section className="py-20 border-t border-gray-100 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="text-2xl font-bold text-[#14B8A6] flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#14B8A6] rounded-lg flex items-center justify-center text-white text-lg font-bold">E</div>
              EduConsult
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">The only ERP you need to scale your global study abroad processing agency.</p>
          </div>
          <div>
            <h4 className="font-bold text-[#0A192F] mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#14B8A6]">About Us</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Success Stories</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Careers</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Press Kit</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#0A192F] mb-6 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#14B8A6]">Features</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Integrations</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">API Docs</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Status Page</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#0A192F] mb-6 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#14B8A6]">Blog</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Community</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Help Center</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Webinars</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#0A192F] mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#14B8A6]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">GDPR</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-400 text-xs border-t border-gray-100">
        <p>© 2026 EduConsult AI. All rights reserved. Built for Global Processing Teams.</p>
      </footer>
    </div>
  );
};

export default LandingPage;