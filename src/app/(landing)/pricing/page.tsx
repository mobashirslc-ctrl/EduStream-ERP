import React from 'react';
import { Check } from 'lucide-react';
// Next.js ব্যবহার করলে নিচের লাইনটি রাখুন:
// import Link from 'next/link'; 

// যদি আপনি Vite বা সাধারণ React ব্যবহার করেন, তবে এটি ব্যবহার করুন:
import { Link } from 'react-router-dom'; 

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      type: "trial", 
      price: "Free",
      description: "Perfect for small agencies starting out.",
      features: ["5 Students / Month", "Basic CRM", "Standard Assessment", "Email Support"],
      buttonText: "Start Free Trial",
      featured: false
    },
    {
      name: "Professional",
      type: "monthly", 
      price: "$49",
      description: "Best for growing agencies with team members.",
      features: ["Unlimited Students", "AI Assessment Pro", "Design Studio Access", "Priority Support", "Partner Portal"],
      buttonText: "Try Pro",
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-500">Choose the plan that fits your consultancy business.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <div key={index} className={`p-8 rounded-3xl bg-white border ${plan.featured ? 'border-teal-500 shadow-xl' : 'border-slate-200'} relative`}>
            {plan.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</span>}
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg text-gray-400 font-normal">{plan.price !== 'Free' && '/mo'}</span></div>
            <p className="text-gray-500 mb-8">{plan.description}</p>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <Check size={18} className="text-teal-500" /> {feature}
                </li>
              ))}
            </ul>

            {/* গুরুত্বপূর্ণ পরিবর্তন: Next.js হলে href ব্যবহার করুন, React Router হলে to */}
            <Link to={`/login?package=${plan.name}&type=${plan.type}`}>
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.featured ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                {plan.buttonText}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;