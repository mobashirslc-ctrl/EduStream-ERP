import React from 'react';
import { Check } from 'lucide-react';

const PricingPage = () => {
  const plans = [
    { name: "Starter", price: "99", features: ["100 Students", "AI Assessment", "Basic CRM"] },
    { name: "Professional", price: "299", features: ["500 Students", "Full CRM", "AI Marketing Hub"], popular: true },
    { name: "Enterprise", price: "799", features: ["Unlimited Students", "White-label", "24/7 Support"] }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-[#0A192F] mb-16">Simple, Transparent <span className="text-[#14B8A6]">Pricing</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`p-8 rounded-3xl border-2 transition-all ${plan.popular ? 'border-[#14B8A6] shadow-xl scale-105' : 'border-gray-100 hover:border-teal-100'}`}>
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">${plan.price}<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="text-left space-y-4 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-600">
                    <Check size={18} className="text-[#14B8A6]" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold ${plan.popular ? 'bg-[#14B8A6] text-white' : 'border-2 border-[#14B8A6] text-[#14B8A6]'}`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;