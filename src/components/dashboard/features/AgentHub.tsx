"use client";
import React, { useState } from 'react';
import { 
  Users, UserCheck, UserX, ShieldAlert, 
  Search, ExternalLink, MoreVertical, Ban, 
  CheckCircle2, Clock, Mail, MapPin 
} from 'lucide-react';

export function AgentHub() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dummy Data for Agents (Pore Realtime Database theke asbe)
  const [agents, setAgents] = useState([
    { id: '1', name: "Global Visa Solutions", owner: "Rahat Kabir", location: "Dhaka, BD", email: "info@globalvisa.com", status: "active", files: 45, successRate: "92%" },
    { id: '2', name: "Success Education Hub", owner: "Nusrat Jahan", location: "Chittagong, BD", email: "nusrat@success.com", status: "pending", files: 0, successRate: "0%" },
    { id: '3', name: "Overseas Dream Agency", owner: "Tanvir Ahmed", location: "Sylhet, BD", email: "contact@overseas.com", status: "blocked", files: 12, successRate: "75%" },
  ]);

  const updateStatus = (id: string, newStatus: 'active' | 'blocked' | 'pending') => {
    setAgents(agents.map(agent => agent.id === id ? { ...agent, status: newStatus } : agent));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-teal-950 uppercase italic tracking-tighter">B2B Agent Network</h2>
          <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest mt-1">Recruit, Approve & Manage Sub-Agencies</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search agents..." 
            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 rounded-2xl outline-none text-sm font-medium transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* AGENT LIST TABLE */}
      <div className="bg-white rounded-[3rem] border border-teal-50 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-teal-50/50 border-b border-teal-50">
              <th className="p-6 text-[10px] font-black text-teal-900 uppercase tracking-widest italic">Agency Info</th>
              <th className="p-6 text-[10px] font-black text-teal-900 uppercase tracking-widest italic">Status</th>
              <th className="p-6 text-[10px] font-black text-teal-900 uppercase tracking-widest italic text-center">Performance</th>
              <th className="p-6 text-[10px] font-black text-teal-900 uppercase tracking-widest italic text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg ${
                      agent.status === 'active' ? 'bg-teal-500' : agent.status === 'blocked' ? 'bg-rose-500' : 'bg-amber-500'
                    }`}>
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 uppercase italic leading-none mb-1">{agent.name}</h4>
                      <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {agent.location}</span>
                        <span className="flex items-center gap-1"><Mail size={10} /> {agent.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="p-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    agent.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    agent.status === 'blocked' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                    'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {agent.status === 'active' && <CheckCircle2 size={12} />}
                    {agent.status === 'blocked' && <Ban size={12} />}
                    {agent.status === 'pending' && <Clock size={12} />}
                    {agent.status}
                  </span>
                </td>

                <td className="p-6">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-black text-teal-900">{agent.files} Files</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{agent.successRate} Success</span>
                  </div>
                </td>

                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {agent.status === 'pending' && (
                      <button 
                        onClick={() => updateStatus(agent.id, 'active')}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 shadow-md transition-all"
                        title="Approve Agent"
                      >
                        <UserCheck size={16} />
                      </button>
                    )}
                    
                    {agent.status !== 'blocked' ? (
                      <button 
                        onClick={() => updateStatus(agent.id, 'blocked')}
                        className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                        title="Block Agent"
                      >
                        <Ban size={16} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => updateStatus(agent.id, 'active')}
                        className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                        title="Unblock Agent"
                      >
                        <UserCheck size={16} />
                      </button>
                    )}
                    
                    <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-teal-500 hover:text-white transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}