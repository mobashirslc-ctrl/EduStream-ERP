"use client";
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Crown } from 'lucide-react';
import Link from 'next/link';

const TrialBanner = () => {
  // উদাহরণস্বরূপ ২৪ ঘণ্টা সেট করা হয়েছে
  const [timeLeft, setTimeLeft] = useState("23:59:59");

  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-2.5 px-4 flex items-center justify-center gap-4 text-xs md:text-sm font-bold animate-in slide-in-from-top duration-500 sticky top-0 z-[100] shadow-lg">
      <div className="flex items-center gap-2 italic">
        <AlertTriangle size={16} className="animate-pulse" />
        <span>FREE TRIAL VERSION: Your access expires in <span className="font-mono bg-white/20 px-2 py-0.5 rounded ml-1">{timeLeft}</span></span>
      </div>
      
      <Link href="/#pricing">
        <button className="bg-white text-red-600 px-4 py-1 rounded-full flex items-center gap-1 hover:bg-gray-100 transition-all text-[11px] uppercase tracking-wider">
          <Crown size={12} fill="currentColor" /> Upgrade Now
        </button>
      </Link>
    </div>
  );
};

export default TrialBanner;