import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="p-10 bg-white shadow-2xl rounded-3xl border border-slate-200">
        <h1 className="text-3xl font-bold mb-2 text-teal-600 text-center">EduStream ERP</h1>
        <p className="text-slate-500 mb-8 text-center">Sign in to your account</p>
        <div className="space-y-4 w-72">
          <input type="email" placeholder="Email" className="w-full p-3 bg-slate-50 border rounded-xl outline-teal-500" />
          <input type="password" placeholder="Password" className="w-full p-3 bg-slate-50 border rounded-xl outline-teal-500" />
          <button className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all">Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;