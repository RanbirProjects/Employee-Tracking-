
import React, { useState, useEffect } from 'react';
import { MOCK_USER, NAVIGATION } from './constants';
import { Dashboard } from './components/Dashboard';
import { Attendance } from './components/Attendance';
import { Tasks } from './components/Tasks';
import { Salary } from './components/Salary';
import { LiveTracking } from './components/LiveTracking';
import { Leaves } from './components/Leaves';

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [modalOpen, setModalOpen] = useState<'task' | 'leave' | null>(null);
  
  const [userTasks, setUserTasks] = useState(MOCK_USER.tasks);
  const [userLeaves, setUserLeaves] = useState([
    { id: 'L1', type: 'Vacation', range: 'May 10 - May 15', status: 'Approved', days: 5 },
    { id: 'L2', type: 'Sick Leave', range: 'Apr 02 - Apr 03', status: 'Approved', days: 2 },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.includes('@')) {
      setLoggedInUser(loginEmail);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setLoginEmail('');
    setIsBreakActive(false);
    setActiveTab('dashboard');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userName = loggedInUser ? loggedInUser.split('@')[0] : 'Guest';

  const toggleBreak = () => setIsBreakActive(!isBreakActive);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask = {
      id: `T${userTasks.length + 1}`,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: 'pending' as const,
      dueDate: formData.get('date') as string,
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
    };
    setUserTasks([newTask, ...userTasks]);
    setModalOpen(null);
  };

  const addLeave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLeave = {
      id: `L${userLeaves.length + 1}`,
      type: formData.get('type') as string,
      range: `${formData.get('start')} - ${formData.get('end')}`,
      status: 'Pending' as const,
      days: 3,
    };
    setUserLeaves([newLeave, ...userLeaves]);
    setModalOpen(null);
  };

  if (!loggedInUser) {
    return (
      <div className="h-screen flex items-center justify-center login-bg p-6">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl p-10 rounded-[48px] shadow-2xl animate-fade-scale text-center border border-white/20">
          <div className="w-24 h-24 bg-slate-900 text-white rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:rotate-6 transition-transform">
            <i className="fas fa-fingerprint text-5xl"></i>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">Activity Portal</h1>
          <p className="text-slate-500 mb-10 font-medium">Your gateway to high-performance tracking.</p>
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Employee Identifier</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input 
                  type="email" 
                  required 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter work email"
                  className="w-full bg-slate-50 border border-slate-200 p-5 pl-14 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" 
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg hover:bg-slate-800 transition-all transform hover:scale-[1.02] shadow-2xl active:scale-95">
              Authenticate Account
            </button>
          </form>
          <p className="mt-10 text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Precision Monitoring v2.4</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard tasks={userTasks} greeting={`${getGreeting()}, ${userName}!`} />;
      case 'maps': return <LiveTracking />;
      case 'attendance': return <Attendance />;
      case 'tasks': return <Tasks tasks={userTasks} onAddTask={() => setModalOpen('task')} />;
      case 'salary': return <Salary />;
      case 'leaves': return <Leaves leaves={userLeaves} onAddLeave={() => setModalOpen('leave')} />;
      default: return <Dashboard tasks={userTasks} greeting={`${getGreeting()}, ${userName}!`} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar */}
      <aside className={`bg-white/80 backdrop-blur-2xl border-r border-slate-100 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col z-50 shadow-sm ${isSidebarOpen ? 'w-80' : 'w-24'}`}>
        <div className="p-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-2xl shadow-slate-900/20 transform hover:scale-110 transition-all">
            <i className="fas fa-bolt text-2xl"></i>
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap animate-fade-scale">
               <span className="text-2xl font-black tracking-tighter">Tracking<span className="text-indigo-600">.</span></span>
            </div>
          )}
        </div>

        <div className="px-6 mt-6 flex-1 custom-scroll overflow-y-auto">
          <p className={`text-[10px] font-black text-slate-300 uppercase mb-8 px-6 tracking-[0.3em] ${!isSidebarOpen && 'hidden'}`}>Environment</p>
          <nav className="space-y-3">
            {NAVIGATION.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-[24px] transition-all group relative ${
                  activeTab === item.id ? 'sidebar-item-active' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <i className={`fas ${item.icon} w-6 text-xl transition-transform group-hover:scale-110`}></i>
                {isSidebarOpen && <span className="font-bold text-sm tracking-wide">{item.name}</span>}
                {activeTab === item.id && isSidebarOpen && <span className="absolute right-4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8 space-y-4">
          {isSidebarOpen && (
            <button 
              onClick={() => setModalOpen('task')}
              className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 transform transition hover:scale-[1.03] hover:bg-indigo-700 active:scale-95"
            >
              <i className="fas fa-plus mr-2"></i> Quick Activity
            </button>
          )}
          <button 
            onClick={toggleBreak}
            className={`w-full py-5 rounded-3xl font-black text-[10px] uppercase transition-all flex items-center justify-center gap-3 border tracking-[0.2em] ${
              isBreakActive 
                ? 'bg-rose-500 text-white border-rose-400 shadow-2xl shadow-rose-100' 
                : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-100 hover:text-indigo-600'
            }`}
          >
            <i className={`fas ${isBreakActive ? 'fa-hourglass-end' : 'fa-play'} ${isSidebarOpen && 'text-sm'}`}></i>
            {isSidebarOpen && (isBreakActive ? 'End Break' : 'Take Break')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-28 px-12 flex items-center justify-between bg-white/20 backdrop-blur-xl border-b border-white/40 z-40">
          <div className="flex items-center gap-8">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-14 h-14 rounded-2xl bg-white/80 border border-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 hover:scale-110 transition-all">
              <i className={`fas ${isSidebarOpen ? 'fa-arrow-left-long' : 'fa-bars-staggered'} text-lg`}></i>
            </button>
            <div className="flex flex-col">
               <h1 className="text-2xl font-black text-slate-900 tracking-tighter capitalize">{activeTab}</h1>
               <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${isBreakActive ? 'bg-rose-500' : 'bg-emerald-500'} animate-pulse`}></span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isBreakActive ? 'Standby Mode' : 'Real-time Feed'}</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden xl:flex items-center gap-4 bg-white/60 px-8 py-4 rounded-3xl border border-white shadow-sm group focus-within:shadow-xl transition-all duration-500">
              <i className="fas fa-magnifying-glass text-slate-300 text-sm group-focus-within:text-indigo-600"></i>
              <input type="text" placeholder="Access database..." className="bg-transparent border-none text-sm font-bold focus:ring-0 w-72 placeholder:text-slate-300" />
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white border border-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm transition-all group-hover:rotate-6">
                  <i className="far fa-bell text-xl"></i>
                </div>
                <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-4 border-white animate-pulse"></span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="w-12 h-12 rounded-2xl bg-white border border-white flex items-center justify-center text-slate-400 hover:text-rose-600 shadow-sm transition-all hover:scale-110 active:scale-95"
                title="Logout Session"
              >
                <i className="fas fa-power-off text-lg"></i>
              </button>
              
              <div className="h-10 w-px bg-slate-200/50"></div>

              <div className="flex items-center gap-5 bg-white/80 p-2 pr-6 rounded-3xl border border-white shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group">
                <div className="relative">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
                    className="w-12 h-12 rounded-2xl bg-indigo-50 border border-white shadow-inner group-hover:scale-110 transition-transform" 
                    alt="avatar" 
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                </div>
                <div className="hidden lg:block">
                   <p className="text-sm font-black text-slate-900 leading-none mb-1 capitalize group-hover:text-indigo-600 transition-colors">{userName}</p>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.1em]">{MOCK_USER.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scroll px-12 pt-10">
          {renderContent()}
        </div>
      </main>

      {/* Modals with Premium Feel */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center modal-overlay p-4 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[48px] w-full max-w-xl p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] animate-fade-scale border border-white/50">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{modalOpen === 'task' ? 'Create Activity' : 'Leave Request'}</h2>
                <p className="text-slate-400 font-medium mt-1">Submit parameters to the monitoring engine.</p>
              </div>
              <button onClick={() => setModalOpen(null)} className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            {modalOpen === 'task' ? (
              <form onSubmit={addTask} className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Objective Title</label>
                  <input name="title" required className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-base font-bold focus:ring-4 focus:ring-indigo-500/10 focus:bg-white outline-none transition-all placeholder:text-slate-300" placeholder="e.g. System Audit Phase #2" />
                </div>
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Context & Notes</label>
                  <textarea name="description" placeholder="Include technical parameters..." className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-base font-medium focus:ring-4 focus:ring-indigo-500/10 focus:bg-white outline-none transition-all" rows={4}></textarea>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Priority Matrix</label>
                    <select name="priority" className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-base font-black cursor-pointer appearance-none">
                      <option value="low">Low Impact</option>
                      <option value="medium">Medium Yield</option>
                      <option value="high">Critical Path</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Target Date</label>
                    <input name="date" type="date" required className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-base font-black" />
                  </div>
                </div>
                <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xl mt-6 transform transition hover:scale-[1.02] hover:bg-indigo-600 shadow-2xl active:scale-95">
                  Launch Activity
                </button>
              </form>
            ) : (
              <form onSubmit={addLeave} className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Category Selection</label>
                  <select name="type" className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-base font-black appearance-none">
                    <option>Vacation Flow</option>
                    <option>Medical Recovery</option>
                    <option>Personal Bandwidth</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Start Cycle</label>
                    <input name="start" type="date" required className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-base font-black" />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">End Cycle</label>
                    <input name="end" type="date" required className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-base font-black" />
                  </div>
                </div>
                <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xl mt-6 transform transition hover:scale-[1.02] shadow-2xl active:scale-95">
                  Request Authorization
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
