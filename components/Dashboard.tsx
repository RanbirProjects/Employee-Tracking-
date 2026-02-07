import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_TEAM, MOCK_USER } from '../constants';
import { StatCard } from './StatCard';
import { Task } from '../types';

const attendanceData = [
  { name: 'Mon', hours: 8.5 }, { name: 'Tue', hours: 9.2 }, { name: 'Wed', hours: 8.0 },
  { name: 'Thu', hours: 8.8 }, { name: 'Fri', hours: 9.5 }, { name: 'Sat', hours: 0 },
  { name: 'Sun', hours: 0 },
];

interface DashboardProps {
  tasks: Task[];
  greeting: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, greeting }) => {
  const [insight, setInsight] = useState<string>("Initializing workspace monitor...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setInsight("Your efficiency peaked at 2:45 PM yesterday. You're on track for a high performance week!");
    }, 1200);
    return () => clearTimeout(timer);
  }, [tasks]);

  const taskData = [
    { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: '#10b981' },
    { name: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: '#6366f1' },
  ];

  return (
    <div className="space-y-10 animate-slide-up pb-10">
      {/* Hero Welcome Card */}
      <div className="relative group overflow-hidden bg-slate-900 rounded-[48px] p-10 md:p-12 text-white shadow-2xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-black uppercase tracking-[0.2em] text-indigo-300">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
              Live Performance Tracking
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
              {greeting}
            </h2>
            <p className="text-slate-400 font-medium text-lg max-w-xl leading-relaxed">
              {insight}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Current Role</p>
                <p className="font-bold text-sm">{MOCK_USER.role}</p>
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Leaves Balance</p>
                <p className="font-bold text-sm">{MOCK_USER.totalLeaves - MOCK_USER.leavesTaken} Days Left</p>
              </div>
            </div>
          </div>
          <div className="shrink-0 relative">
            <div className="w-48 h-48 rounded-[60px] bg-gradient-to-br from-indigo-500 to-violet-600 p-1 rotate-6 group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${greeting.split(',')[1]}`} 
                className="w-full h-full rounded-[58px] bg-slate-800 object-cover" 
                alt="Profile" 
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-xl animate-bounce">
              <i className="fas fa-bolt-lightning text-xl"></i>
            </div>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[140px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500 rounded-full blur-[120px] opacity-10 -ml-20 -mb-20"></div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Task Velocity" value={`${Math.round((tasks.filter(t=>t.status==='completed').length / tasks.length) * 100)}%`} icon="fa-gauge-high" color="bg-indigo-600" trend="+5%" isTrendPositive={true} />
        <StatCard title="Rest & Recovery" value={`${MOCK_USER.averageSleepScore}%`} icon="fa-bed" color="bg-emerald-600" trend="Optimal" isTrendPositive={true} />
        <StatCard title="Pending Items" value={tasks.filter(t => t.status === 'pending').length} icon="fa-clipboard-list" color="bg-amber-600" />
        <StatCard title="Salary Insight" value={`$${MOCK_USER.salaryHistory[0].netPay.toLocaleString()}`} icon="fa-wallet" color="bg-rose-600" trend="Next: May 28" isTrendPositive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Activity Chart */}
        <div className="lg:col-span-8 glass-card p-10 rounded-[40px] shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900">Weekly Energy Flow</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Average logged hours: 8.8h</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg"><i className="fas fa-chart-area"></i></button>
              <button className="p-2 w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors"><i className="fas fa-chart-bar"></i></button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: '700'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: '700'}} dx={-10} />
                <Tooltip 
                   contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 30px -10px rgba(0,0,0,0.1)', padding: '15px'}}
                   cursor={{stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '4 4'}}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorHours)" animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Distribution */}
        <div className="lg:col-span-4 glass-card p-10 rounded-[40px] shadow-sm flex flex-col items-center">
          <h3 className="text-xl font-black text-slate-900 mb-8 self-start">Workflow Split</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {taskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900">{tasks.length}</span>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            {taskData.map(item => (
              <div key={item.name} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.name}</span>
                </div>
                <p className="text-lg font-black text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Presence & Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 glass-card p-10 rounded-[40px] shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8">Live Team Status</h3>
          <div className="space-y-6">
            {MOCK_TEAM.slice(0, 3).map((m, i) => (
              <div key={m.id} className="flex items-center gap-4 animate-slide-in" style={{animationDelay: `${i * 150}ms`}}>
                <div className="relative">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.avatar}`} className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm" alt="" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${m.status === 'online' ? 'bg-emerald-500' : m.status === 'on-site' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 leading-none mb-1">{m.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{m.lastLocation}</p>
                </div>
                <div className="ml-auto">
                   <button className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"><i className="fas fa-location-arrow text-xs"></i></button>
                </div>
              </div>
            ))}
            <button className="w-full py-4 mt-4 rounded-2xl bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all">View Full Radar</button>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-10 rounded-[40px] shadow-sm">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-slate-900">System Logs</h3>
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Tracking Live</span>
           </div>
           <div className="space-y-4">
              {[
                { time: '09:00 AM', event: 'Shift Started', icon: 'fa-door-open', color: 'text-indigo-600' },
                { time: '11:20 AM', event: 'Field Site Reached', icon: 'fa-location-dot', color: 'text-rose-600' },
                { time: '01:15 PM', event: 'Break Initiated', icon: 'fa-mug-hot', color: 'text-amber-600' },
                { time: '02:00 PM', event: 'Break Concluded', icon: 'fa-play', color: 'text-emerald-600' }
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-slate-50/50 transition-colors border border-transparent hover:border-slate-100 group">
                   <span className="text-xs font-black text-slate-400 w-20">{log.time}</span>
                   <div className={`w-10 h-10 rounded-xl bg-slate-50 ${log.color} flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all shadow-sm`}>
                      <i className={`fas ${log.icon}`}></i>
                   </div>
                   <span className="text-sm font-bold text-slate-800">{log.event}</span>
                   <span className="ml-auto text-[10px] font-black text-slate-300 uppercase">Verified</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};