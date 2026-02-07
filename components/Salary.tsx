
import React from 'react';
import { MOCK_USER } from '../constants';

export const Salary: React.FC = () => {
  const downloadSlip = (month: string) => {
    alert(`Generating encrypted PDF for ${month} 2024...`);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-3">Earnings Summary</p>
            <h2 className="text-6xl font-black tracking-tighter mb-8">$8,800.00</h2>
            <div className="flex flex-wrap gap-4">
               <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-[24px] backdrop-blur-xl">
                  <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Base Component</p>
                  <p className="text-xl font-extrabold">$8,500</p>
               </div>
               <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 rounded-[24px] backdrop-blur-xl">
                  <p className="text-[10px] text-emerald-400 font-black uppercase mb-1">Performance Bonus</p>
                  <p className="text-xl font-extrabold text-emerald-400">+$300</p>
               </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-[32px] p-8 border border-white/10 backdrop-blur-md self-center">
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400 font-bold">Projected Annual</span>
                   <span className="font-black text-indigo-400">$105,600.00</span>
                </div>
                <div className="h-px bg-white/10 w-full"></div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400 font-bold">Next Payout</span>
                   <span className="font-black">May 28, 2024</span>
                </div>
                <button className="w-full mt-4 bg-indigo-600 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">View Detailed Breakdown</button>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[160px] opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600 rounded-full blur-[120px] opacity-10 -ml-32 -mb-32"></div>
      </div>

      <div className="bg-white p-10 rounded-[48px] premium-shadow border border-slate-100">
        <h3 className="text-2xl font-black text-slate-900 mb-10">Payroll Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_USER.salaryHistory.map(slip => (
            <div key={slip.id} className="group p-8 rounded-[40px] border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-500 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-[28px] bg-slate-50 group-hover:bg-white group-hover:rotate-6 group-hover:scale-110 flex items-center justify-center mb-6 transition-all duration-500 shadow-sm">
                <i className="fas fa-file-invoice-dollar text-3xl text-indigo-600"></i>
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-1">{slip.month} {slip.year}</h4>
              <p className="text-xs text-slate-400 font-bold mb-6 tracking-wide">Net Pay: <span className="text-slate-900">${slip.netPay.toLocaleString()}</span></p>
              
              <button 
                onClick={() => downloadSlip(slip.month)}
                className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] hover:text-indigo-800 transition-colors"
              >
                <i className="fas fa-cloud-arrow-down text-sm"></i>
                Get Slip
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
