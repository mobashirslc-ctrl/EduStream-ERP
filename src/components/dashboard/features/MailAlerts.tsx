import React from 'react';
import { Bell, X } from 'lucide-react';

const MailAlerts = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Bell size={32} />
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2">Smart Mail Alerts</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">Compliance team status update korlei student ebong partner-er kache auto mail jabe.</p>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mb-4">
           <span className="text-sm font-bold text-slate-600">Active Notifications</span>
           <div className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div></div>
        </div>
        <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs">Close Settings</button>
      </div>
    </div>
  );
};
export default MailAlerts;