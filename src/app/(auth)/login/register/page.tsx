import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Building2, User, Mail, MapPin, Lock, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const Register = () => {
  const [step, setStep] = useState<'form' | 'pending'>('form');
  const [formData, setFormData] = useState({
    agencyName: '',
    authorizedName: '',
    address: '',
    contactNo: '',
    email: '',
    package: 'Professional', // Default
    password: '',
    confirmPass: ''
  });

  const helplineNumber = "+88017XXXXXXXX"; // আপনার সেলস টিমের নম্বর

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // এখানে Firebase বা API কল করে ডাটা সেভ হবে (status: 'pending')
    console.log("Registration Data:", formData);
    setStep('pending');
  };

  if (step === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl text-center border border-teal-50">
          <div className="w-20 h-20 bg-teal-50 text-[#14B8A6] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-bold text-[#0A192F] mb-4">Under Investigation!</h2>
          <p className="text-gray-500 leading-relaxed mb-8 text-sm">
            ধন্যবাদ! আপনার এজেন্সির ডিটেইলস আমরা পেয়েছি। আমাদের সেলস টিম আপনার দেওয়া তথ্যগুলো যাচাই করছে। <br />
            <span className="font-bold text-[#14B8A6]">আগামী ২৪ ঘণ্টার মধ্যে</span> আপনার পোর্টালটি অ্যাক্টিভেট করে দেওয়া হবে।
          </p>
          
          <div className="space-y-4">
            <a 
              href={`tel:${helplineNumber}`}
              className="w-full py-4 bg-[#14B8A6] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-all shadow-lg shadow-teal-100"
            >
              <PhoneCall size={18} /> Contact Sales
            </a>
            <Link to="/" className="block text-sm text-gray-400 font-medium hover:text-[#0A192F]">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side Info */}
        <div className="md:w-1/3 bg-[#0A192F] p-10 text-white flex flex-col justify-center">
          <div className="w-12 h-12 bg-[#14B8A6] rounded-xl flex items-center justify-center text-xl font-bold mb-6">E</div>
          <h3 className="text-xl font-bold mb-4 italic">Join our Global Network</h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            রেজিস্ট্রেশন করার পর আপনার তথ্যগুলো আমাদের টিম ম্যানুয়ালি চেক করবে সর্বোচ্চ নিরাপত্তার জন্য।
          </p>
        </div>

        {/* Registration Form */}
        <div className="md:w-2/3 p-10">
          <h2 className="text-2xl font-bold mb-8 text-[#0A192F]">Agency Registration</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                <Building2 size={14} /> Agency Name
              </label>
              <input required type="text" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14B8A6] outline-none transition-all text-sm" placeholder="e.g. Dream Abroad Ltd" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                <User size={14} /> Authorized Name
              </label>
              <input required type="text" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14B8A6] outline-none text-sm" placeholder="CEO/Manager Name" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                <PhoneCall size={14} /> Contact Number
              </label>
              <input required type="tel" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14B8A6] outline-none text-sm" placeholder="+880 1XXX-XXXXXX" />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                <Mail size={14} /> Official Email Address
              </label>
              <input required type="email" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14B8A6] outline-none text-sm" placeholder="agency@mail.com" />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                <MapPin size={14} /> Office Address
              </label>
              <textarea required className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14B8A6] outline-none text-sm" placeholder="Full Address" rows={2}></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                <CheckCircle size={14} /> Selected Package
              </label>
              <select className="w-full p-3.5 bg-teal-50 border border-teal-100 rounded-xl focus:border-[#14B8A6] outline-none text-sm font-bold text-[#14B8A6]">
                <option value="Starter">Starter Plan - ৳5,000</option>
                <option value="Professional">Professional Plan - ৳10,000</option>
                <option value="Enterprise">Enterprise - Custom</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                <Lock size={14} /> Password
              </label>
              <input required type="password" title="password" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14B8A6] outline-none text-sm" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                <Lock size={14} /> Confirm Password
              </label>
              <input required type="password" title="confirmPass" className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14B8A6] outline-none text-sm" />
            </div>

            <div className="md:col-span-2 pt-4">
              <button type="submit" className="w-full py-4 bg-[#14B8A6] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-all shadow-lg shadow-teal-100">
                Submit for Approval <ChevronRight size={20} />
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
                By clicking submit, you agree to our terms and conditions for processing agencies.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;