import React from 'react';
import { Zap, ArrowRight, CheckCircle2, Layout, Users, BarChart3, ShieldCheck, Palette, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0A192F]">
      {/* 1. Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-[#14B8A6] flex items-center gap-2">
          <div className="w-8 h-8 bg-[#14B8A6] rounded-lg flex items-center justify-center text-white text-lg">E</div>
          EduConsult AI
        </div>
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <a href="#features" className="hover:text-[#14B8A6] transition-colors">Features</a>
          <Link to="/pricing" className="hover:text-[#14B8A6] transition-colors">Pricing</Link>
          <a href="#demo" className="hover:text-[#14B8A6] transition-colors">Demo</a>
        </div>
        <Link to="/login">
          <button className="bg-[#14B8A6] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#0D9488] transition-all">
            Start Free Trial
          </button>
        </Link>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-20 pb-20 px-6 text-center max-w-5xl mx-auto">
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
          <Link to="/login">
            <button className="px-10 py-4 bg-[#14B8A6] text-white rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg shadow-teal-200 hover:scale-105 transition-all">
              Get Started Free <ArrowRight size={22} />
            </button>
          </Link>
          <button className="px-10 py-4 border-2 border-teal-100 text-[#14B8A6] rounded-xl font-bold text-lg hover:bg-teal-50 transition-all">
            Watch Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-gray-100">
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

      {/* 3. Features Section (Based on image 1) */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to <span className="text-[#14B8A6]">Succeed</span></h2>
            <p className="text-gray-500">Powerful features designed specifically for education consultancy agencies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="text-white" />, title: "AI Student Assessment", desc: "Intelligent eligibility checker with instant results. AI analyzes profiles and matches best-fit universities." },
              { icon: <Palette className="text-white" />, title: "DIY Design Studio", desc: "Canva-style tools for creating marketing materials. Pre-built templates for success stories." },
              { icon: <Users className="text-white" />, title: "Multi-Level CRM", desc: "Manage sub-agents, staff, and students with role-based permissions in one platform." },
              { icon: <BarChart3 className="text-white" />, title: "Real-time Tracking", desc: "Track application status from submission to visa approval with automated notifications." },
              { icon: <ShieldCheck className="text-white" />, title: "Compliance Management", desc: "Kanban-style workflow for document processing with secure document vault." },
              { icon: <Megaphone className="text-white" />, title: "AI Marketing Hub", desc: "Generate social media content, Facebook posts, and captions automatically with AI." }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-[#14B8A6] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ready to Transform (Based on image 3) */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#14B8A6] to-[#0D9488] rounded-[2rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Agency?</h2>
            <p className="text-teal-50 text-lg mb-8">Join 500+ agencies already using EduConsult AI to streamline their operations and grow their business.</p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-teal-200" /> Free 14-day trial, no credit card required</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-teal-200" /> Setup in less than 5 minutes</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-teal-200" /> Cancel anytime, no questions asked</li>
            </ul>
            <div className="flex gap-4">
              <Link to="/login" className="bg-white text-[#14B8A6] px-8 py-3 rounded-xl font-bold hover:bg-teal-50 transition-all flex items-center gap-2">
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <button className="border-2 border-white/30 px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/3 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="space-y-6">
              {[
                { label: "Students Processed", val: "50,247" },
                { label: "Visa Success Rate", val: "98.5%" },
                { label: "Active Agencies", val: "523" },
                { label: "Average Response Time", val: "2.3h" }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <span className="text-teal-100">{stat.label}</span>
                  <span className="text-xl font-bold">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer (Based on image 4) */}
      <footer className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#features" className="hover:text-[#14B8A6]">Features</a></li>
              <li><Link to="/pricing" className="hover:text-[#14B8A6]">Pricing</Link></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Demo</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Updates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-[#14B8A6]">Documentation</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Tutorials</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">API Reference</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-[#14B8A6]">About Us</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Blog</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Careers</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-[#14B8A6]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-[#14B8A6]">GDPR</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm">
          © 2026 EduConsult AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;