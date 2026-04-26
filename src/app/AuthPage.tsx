"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, User, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const selectedPackage = searchParams.get('package');

  useEffect(() => {
    // যদি URL-এ প্যাকেজ থাকে, তবে সরাসরি সাইন আপ মোড দেখাবে
    if (selectedPackage) {
      setIsSignUp(true);
    }
  }, [selectedPackage]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans italic">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')} 
          className="flex justify-center items-center gap-2 mb-6 cursor-pointer"
        >
          <div className="w-10 h-10 bg-[#14B8A6] rounded-xl flex items-center justify-center text-white text-xl font-bold">E</div>
          <span className="text-2xl font-bold text-[#0A192F]">EduConsult AI</span>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-[#0A192F]">
          {isSignUp ? "Create your account" : "Sign in to your portal"}
        </h2>
        {isSignUp && selectedPackage && (
          <div className="mt-2 flex justify-center items-center gap-2 text-[#14B8A6] font-semibold bg-teal-50 py-1 px-4 rounded-full w-fit mx-auto border border-teal-100">
            <CheckCircle2 size={16} />
            Selected Plan: {selectedPackage}
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-2xl shadow-gray-200/50 sm:rounded-[2.5rem] border border-gray-100 sm:px-12">
          <form className="space-y-6" action="#" method="POST">
            {/* Registration-এর জন্য Full Name ফিল্ড */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all"
                  placeholder="name@agency.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#14B8A6] focus:ring-[#14B8A6] border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-500">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-[#14B8A6] hover:text-[#0D9488]">Forgot password?</a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[#14B8A6] hover:bg-[#0D9488] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14B8A6] transition-all transform hover:scale-[1.02]"
              >
                {isSignUp ? (selectedPackage === 'Free' ? 'Start Free Trial' : `Get ${selectedPackage} Now`) : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gray-600 font-medium hover:text-[#14B8A6] transition-colors"
              >
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Register now"}
              </button>
            </div>
          </div>
        </div>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="mt-8 w-full flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Landing Page
        </button>
      </div>
    </div>
  );
};

export default AuthPage;