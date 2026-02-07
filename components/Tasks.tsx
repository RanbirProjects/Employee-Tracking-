
import React from 'react';
import { Task } from '../types';

interface TasksProps {
  tasks: Task[];
  onAddTask: () => void;
}

export const Tasks: React.FC<TasksProps> = ({ tasks, onAddTask }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Tasks</h2>
          <p className="text-gray-500 font-medium">Manage and monitor field objectives</p>
        </div>
        <button 
          onClick={onAddTask}
          className="bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 action-button shadow-xl shadow-gray-200"
        >
          <i className="fas fa-plus"></i> New Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">In Progress ({tasks.filter(t=>t.status==='pending').length})</h3>
          {tasks.filter(t => t.status === 'pending').map(task => (
            <div key={task.id} className="bg-white p-6 rounded-3xl border border-gray-200 card-shadow hover:border-blue-500/20 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg ${
                  task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}>{task.priority}</span>
                <button className="text-gray-300 hover:text-gray-600"><i className="fas fa-ellipsis"></i></button>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h4>
              <p className="text-sm text-gray-500 mb-6">{task.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-xs font-bold text-gray-400"><i className="far fa-calendar mr-2"></i> {task.dueDate}</span>
                <button className="text-xs font-bold text-blue-600 hover:underline">Complete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Completed ({tasks.filter(t=>t.status==='completed').length})</h3>
          {tasks.filter(t => t.status === 'completed').map(task => (
            <div key={task.id} className="bg-white/50 p-6 rounded-3xl border border-gray-100 opacity-70">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-base font-bold text-gray-400 line-through">{task.title}</h4>
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px]"><i className="fas fa-check"></i></div>
              </div>
              <p className="text-xs text-gray-400">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
