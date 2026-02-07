
import React from 'react';

interface LeaveItem {
  id: string;
  type: string;
  range: string;
  status: string;
  days: number;
}

interface LeavesProps {
  leaves: LeaveItem[];
  onAddLeave: () => void;
}

export const Leaves: React.FC<LeavesProps> = ({ leaves, onAddLeave }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Time Off</h2>
          <p className="text-gray-500 font-medium">Manage your leaves and vacation balance</p>
        </div>
        <button 
          onClick={onAddLeave}
          className="bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 action-button shadow-xl shadow-gray-200"
        >
          <i className="fas fa-plus"></i> Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 card-shadow">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Vacation</p>
          <h3 className="text-3xl font-bold">12 Days</h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">Available balance</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-200 card-shadow">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Sick Leave</p>
          <h3 className="text-3xl font-bold">5 Days</h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">Available balance</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-200 card-shadow">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Upcoming</p>
          <h3 className="text-3xl font-bold">2 Days</h3>
          <p className="text-xs text-amber-500 mt-2 font-bold uppercase tracking-tighter">Pending Approval</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 card-shadow">
        <h3 className="text-lg font-bold mb-8">Leave History</h3>
        <div className="space-y-4">
          {leaves.map(leave => (
            <div key={leave.id} className="flex items-center p-5 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-6 ${
                leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                <i className={`fas ${leave.type === 'Sick Leave' ? 'fa-pills' : 'fa-plane'} text-xl`}></i>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{leave.type}</h4>
                <p className="text-xs font-bold text-gray-400 uppercase mt-1 tracking-tight">{leave.range}</p>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                  leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {leave.status}
                </span>
                <p className="text-sm font-bold text-gray-800 mt-2">{leave.days} Days</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
