import React from 'react';
import { Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0A192F]">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-[#14B8A6] flex items-center gap-2">
          <div className="w-8 h-8 bg-[#14B8A6] rounded-lg flex items-center justify-center text-white text-lg">E</div>
          EduConsult AI
        </div>
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <a href="#features" className="hover:text-[#14B8A6] transition-colors">Features</a>
          {/* Pricing এর জন্য Link ব্যবহার করা হলো */}
          <Link href="/pricing" className="hover:text-[#14B8A6] transition-colors">Pricing</Link>
          <a href="#demo" className="hover:text-[#14B8A6] transition-colors">Demo</a>
        </div>
        {/* Login এ যাওয়ার জন্য Link */}
        <Link href="/login">
          <button className="bg-[#14B8A6] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0D9488] transition-all">
            Start Free Trial
          </button>
        </Link>
      </nav>

      <section className="pt-20 pb-32 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#14B8A6] mb-8">
          <Zap size={16} fill="currentColor" />
          <span className="text-sm font-semibold tracking-wide">AI-POWERED EDUCATION MANAGEMENT</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-[1.05]">
          Transform Your<br /> 
          <span className="text-[#14B8A6]">Consultancy Business</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-gray-500 text-xl mb-12 leading-relaxed">
          Complete SaaS platform for education agencies with AI assessment, CRM, design studio, and real-time tracking. Everything you need in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
          {/* Get Started Button এখন Login পেজে নিয়ে যাবে */}
          <Link href="/login">
            <button className="px-10 py-4 bg-[#14B8A6] text-white rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg shadow-teal-200 hover:scale-105 transition-all">
              Get Started Free <ArrowRight size={22} />
            </button>
          </Link>
          
          <button className="px-10 py-4 border-2 border-teal-100 text-[#14B8A6] rounded-xl font-bold text-lg hover:bg-teal-50 transition-all">
            Watch Demo
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-gray-100 mt-10">
          <div>
            <div className="text-4xl font-bold text-[#0A192F]">500+</div>
            <div className="text-gray-500 font-medium">Active Agencies</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#0A192F]">50K+</div>
            <div className="text-gray-500 font-medium">Students Processed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#0A192F]">98%</div>
            <div className="text-gray-500 font-medium">Success Rate</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;