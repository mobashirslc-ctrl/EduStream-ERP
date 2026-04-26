"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, User, Mail, PhoneCall, MapPin, Lock, ChevronRight, ShieldCheck, Zap } from 'lucide-react';

const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<'form' | 'pending'>('form');
  
  // URL থেকে প্যাকেজ চেক করা (রেজিস্ট্রেশন পেজে ফিরে আসার জন্য)
  const selectedPkg = searchParams.get('package') || 'Professional';

  const helplineNumber = "+88017XXXXXXXX";

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trial চেক করা (যদি প্যাকেজ Free হয় তবে সরাসরি ড্যাশবোর্ডে যাবে)
    if (selectedPkg === 'Free') {
      router.push('/dashboard?trial=active');
    } else {
      setStep('pending');
    }
  };

  if (step === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 italic">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl text-center border border-teal-50">
          <div className="w-20 h-20 bg-teal-50 text-[#14B8A6] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-bold text-[#0A192F] mb-4">Under Investigation!</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            আপনার তথ্যগুলো যাচাই করা হচ্ছে। ২৪ ঘণ্টার মধ্যে সেলস টিম থেকে আপডেট পাবেন।
          </p>
          <a href={`tel:${helplineNumber}`} className="w-full py-4 bg-[#14B8A6] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-all">
            <PhoneCall size={18} /> Contact Sales
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6 italic">
      <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side: Toggle & Info */}
        <div className="md:w-1/3 bg-[#0A192F] p-10 text-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-[#14B8A6] rounded-xl flex items-center justify-center text-xl font-bold mb-8">E</div>
            <h2 className="text-3xl font-bold mb-4">{isLogin ? 'Welcome Back!' : 'Start Your Agency Hub'}</h2>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'আপনার ড্যাশবোর্ডে লগইন করে ফাইলগুলো ম্যানেজ করুন।' : 'রেজিস্ট্রেশন করে আপনার এজেন্সিকে অটোমেশনে নিয়ে আসুন।'}
            </p>
          </div>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="mt-8 py-3 border border-gray-600 rounded-xl hover:bg-white/10 transition-all font-semibold"
          >
            {isLogin ? 'Create an Account' : 'Already have account? Login'}
          </button>
        </div>

        {/* Right Side: Forms */}
        <div className="md:w-2/3 p-10 lg:p-14">
          {isLogin ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold mb-8 italic">Agency Login</h3>
              <form className="space-y-6">
                <input type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#14B8A6]" />
                <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#14B8A6]" />
                <button className="w-full py-4 bg-[#14B8A6] text-white rounded-2xl font-bold shadow-lg hover:bg-[#0D9488]">Login Now</button>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <h3 className="text-2xl font-bold mb-6 italic">Registration</h3>
              <form onSubmit={handleRegisterSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Agency Name" className="w-full p-3 bg-gray-50 border rounded-xl outline-none text-sm" />
                <input required placeholder="Authorized Name" className="w-full p-3 bg-gray-50 border rounded-xl outline-none text-sm" />
                <input required type="email" placeholder="Official Email" className="w-full p-3 bg-gray-50 border rounded-xl outline-none text-sm md:col-span-2" />
                
                {/* Package Selection Link */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between p-3 bg-teal-50 border border-teal-100 rounded-xl">
                    <span className="text-sm font-bold text-[#14B8A6]">Package: {selectedPkg}</span>
                    <button 
                      type="button"
                      onClick={() => {
                        // ল্যান্ডিং পেজের প্রাইসিং সেকশনে জাম্প করবে
                        router.push('/#pricing');
                      }}
                      className="text-xs bg-[#14B8A6] text-white px-3 py-1.5 rounded-lg hover:bg-[#0D9488]"
                    >
                      Change Plan
                    </button>
                  </div>
                </div>

                <input required type="password" placeholder="Password" className="w-full p-3 bg-gray-50 border rounded-xl outline-none text-sm" />
                <input required type="password" placeholder="Confirm Password" className="w-full p-3 bg-gray-50 border rounded-xl outline-none text-sm" />
                
                <button className="md:col-span-2 w-full py-4 bg-[#0A192F] text-white rounded-2xl font-bold mt-4 shadow-xl">
                  {selectedPkg === 'Free' ? 'Start 24h Free Trial' : 'Submit for Investigation'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;