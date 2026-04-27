"use client";
import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Circle, Trophy, 
  PlusCircle, Calendar, UserPlus, TrendingUp 
} from 'lucide-react';

export function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    { id: '1', name: "Sabbir Ahmed", role: "Case Officer", tasks: 5, completed: 3, score: 85 },
    { id: '2', name: "Anika Tahsin", role: "Compliance Lead", tasks: 4, completed: 4, score: 100 },
    { id: '3', name: "Rifat Karim", role: "Documentation Specialist", tasks: 6, completed: 2, score: 60 },
  ]);

  const [newTask, setNewTask] = useState({ empId: '', title: '' });

  const toggleTask = (empId: string) => {
    setEmployees(employees.map(emp => {
      if (emp.id === empId && emp.completed < emp.tasks) {
        const newCompleted = emp.completed + 1;
        // Logic: Score calculation (Task completion ratio)
        const newScore = Math.round((newCompleted / emp.tasks) * 100);
        return { ...emp, completed: newCompleted, score: newScore };
      }
      return emp;
    }));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-[2rem] text-white shadow-xl">
          <TrendingUp className="mb-4 opacity-50" size={32} />
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80">Team Efficiency</h4>
          <p className="text-3xl font-black italic tracking-tighter">82%</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-indigo-50 shadow-sm">
          <Trophy className="mb-4 text-amber-500" size={32} />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Top Performer</h4>
          <p className="text-xl font-black text-slate-800 uppercase italic">Anika Tahsin</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-indigo-50 shadow-sm">
          <Calendar className="mb-4 text-indigo-500" size={32} />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Tasks Today</h4>
          <p className="text-3xl font-black text-slate-800 italic">15</p>
        </div>
      </div>

      {/* EMPLOYEE LIST & TASK MONITOR */}
      <div className="bg-white rounded-[2.5rem] border border-indigo-50 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-indigo-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-indigo-950 uppercase italic tracking-tighter">Employee Performance Tracker</h3>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Monitor Daily Tasks & Realtime Scoring</p>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <UserPlus size={14} /> Add Employee
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 gap-4">
          {employees.map((emp) => (
            <div key={emp.id} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-indigo-200 transition-all group">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 uppercase italic tracking-tight">{emp.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{emp.role}</p>
                </div>
              </div>

              {/* Task Progress */}
              <div className="flex flex-col items-center gap-2 px-8 border-x border-slate-50">
                <div className="flex gap-1">
                  {[...Array(emp.tasks)].map((_, i) => (
                    <div key={i}>
                      {i < emp.completed ? 
                        <CheckCircle2 size={16} className="text-emerald-500" /> : 
                        <Circle size={16} className="text-slate-200" />
                      }
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase">{emp.completed}/{emp.tasks} Tasks Done</span>
              </div>

              {/* Realtime Score */}
              <div className="text-center min-w-[100px]">
                <div className={`text-2xl font-black italic ${emp.score >= 80 ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {emp.score}
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Daily Score</span>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => toggleTask(emp.id)}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-md"
              >
                Complete Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}