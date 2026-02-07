import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
  isTrendPositive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend, isTrendPositive }) => {
  return (
    <div className="glass-card p-7 rounded-[32px] group">
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 shadow-lg ${color.replace('bg-', 'bg-opacity-10 text-').replace('text-', 'bg-')} ${color}`}>
          <i className={`fas ${icon} text-2xl`}></i>
        </div>
        {trend && (
          <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isTrendPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
            <i className={`fas fa-caret-${isTrendPositive ? 'up' : 'down'} text-xs`}></i>
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase mb-1.5">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors">{value}</h3>
      </div>
    </div>
  );
};