
import React from 'react';
import { MOCK_TEAM } from '../constants';

export const LiveTracking: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex justify-between items-center bg-white p-8 rounded-[40px] premium-shadow border border-slate-100">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Live Field Radar</h2>
          <p className="text-slate-400 font-semibold text-sm">Real-time location & status of your field team</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-100 transition-all">Optimize Routes</button>
           <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 transform hover:scale-105 transition-all">Export KML</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team List */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[40px] premium-shadow border border-slate-100 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-black text-slate-900">Nearby Team</h3>
            <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase">3 Online</span>
          </div>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scroll pr-2">
            {MOCK_TEAM.map(member => (
              <div key={member.id} className="p-5 rounded-[32px] border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} 
                      className="w-12 h-12 rounded-2xl bg-indigo-50" 
                      alt={member.name} 
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      member.status === 'on-site' ? 'bg-amber-500' : member.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-slate-900 leading-none mb-1 group-hover:text-indigo-600 transition-colors">{member.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{member.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <i className="fas fa-location-dot text-rose-500"></i>
                    {member.lastLocation}
                  </div>
                  <span className="text-[10px] font-black text-indigo-500 group-hover:underline">View Map</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-2 h-[600px] bg-slate-900 rounded-[48px] premium-shadow relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-40 mix-blend-overlay"></div>
          
          {/* Simulated Map Markers */}
          <div className="absolute top-1/4 left-1/3 animate-float">
             <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 bg-indigo-500/20 rounded-full animate-ping"></div>
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl border-2 border-white flex items-center justify-center text-white shadow-xl z-10">
                   <i className="fas fa-user-ninja"></i>
                </div>
             </div>
          </div>

          <div className="absolute bottom-1/2 right-1/4 animate-float" style={{animationDelay: '1s'}}>
             <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 bg-amber-500/20 rounded-full animate-ping"></div>
                <div className="w-10 h-10 bg-amber-500 rounded-2xl border-2 border-white flex items-center justify-center text-white shadow-xl z-10">
                   <i className="fas fa-truck-fast"></i>
                </div>
             </div>
          </div>

          <div className="absolute bottom-8 right-8 flex flex-col gap-2">
             <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-colors"><i className="fas fa-plus"></i></button>
             <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-colors"><i className="fas fa-minus"></i></button>
             <button className="w-12 h-12 bg-indigo-600 rounded-2xl shadow-xl flex items-center justify-center text-white hover:bg-indigo-700 transition-colors mt-2"><i className="fas fa-crosshairs"></i></button>
          </div>

          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 premium-shadow">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Live Updates Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
