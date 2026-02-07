
import React, { useState } from 'react';
import { MOCK_USER } from '../constants';

export const Attendance: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logs, setLogs] = useState(MOCK_USER.attendance);

  const toggleLogin = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (!isLoggedIn) {
      const newLog = {
        id: `A${logs.length + 1}`,
        date: now.toISOString().split('T')[0],
        loginTime: timeStr,
        logoutTime: null,
        status: 'present' as const
      };
      setLogs([newLog, ...logs]);
    } else {
      const updatedLogs = [...logs];
      if (updatedLogs[0]) updatedLogs[0].logoutTime = timeStr;
      setLogs(updatedLogs);
    }
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Punch Card */}
        <div className="lg:col-span-5 bg-white p-10 rounded-[48px] premium-shadow border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
          
          <div className="mb-10 relative">
            <div className={`w-32 h-32 rounded-[40px] flex items-center justify-center transition-all duration-700 ${isLoggedIn ? 'bg-emerald-50 text-emerald-500 shadow-2xl shadow-emerald-100' : 'bg-slate-50 text-slate-300 shadow-xl shadow-slate-100'}`}>
              <i className={`fas ${isLoggedIn ? 'fa-check-circle' : 'fa-power-off'} text-5xl`}></i>
            </div>
            {isLoggedIn && <span className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs animate-bounce border-4 border-white"><i className="fas fa-check"></i></span>}
          </div>
          
          <h3 className="text-3xl font-black text-slate-900 mb-2">{isLoggedIn ? 'Online' : 'Offline'}</h3>
          <p className="text-slate-400 font-medium mb-10 max-w-[280px]">Your session started at 09:00 AM. Keep up the momentum!</p>
          
          <button 
            onClick={toggleLogin}
            className={`w-full py-5 rounded-3xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl ${
              isLoggedIn 
                ? 'bg-rose-500 text-white shadow-rose-100' 
                : 'bg-indigo-600 text-white shadow-indigo-100'
            }`}
          >
            {isLoggedIn ? 'Finish Session' : 'Start Session'}
          </button>

          <div className="mt-8 flex gap-8 text-slate-400">
             <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Weekly Avg</p>
                <p className="text-slate-900 font-extrabold">8.4h</p>
             </div>
             <div className="w-px h-8 bg-slate-100"></div>
             <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Overtime</p>
                <p className="text-slate-900 font-extrabold">2.5h</p>
             </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="lg:col-span-7 bg-white p-10 rounded-[48px] premium-shadow border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-slate-900">Activity Logs</h3>
            <button className="text-indigo-600 text-xs font-black uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">Export PDF</button>
          </div>
          <div className="space-y-4 max-h-[450px] overflow-y-auto custom-scroll pr-4">
            {logs.map((log) => (
              <div key={log.id} className="group flex items-center justify-between p-5 rounded-3xl border border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-white flex flex-col items-center justify-center transition-colors">
                    <span className="text-[10px] font-black uppercase text-slate-400">{log.date.split('-')[1]}</span>
                    <span className="text-lg font-black text-slate-900 leading-none">{log.date.split('-')[2]}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 tracking-tight">Standard Shift</h4>
                    <p className="text-xs text-slate-400 font-bold">{log.loginTime} — {log.logoutTime || 'In Session'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${log.status === 'present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {log.status}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-bold">{log.logoutTime ? '8.5 Hours' : 'Tracking...'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
