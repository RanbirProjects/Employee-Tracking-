
import { EmployeeProfile, TeamMember } from './types';

export const MOCK_USER: EmployeeProfile = {
  id: 'EMP-001',
  name: 'Alex Sterling',
  role: 'Field Manager',
  email: 'alex.sterling@nexushr.com',
  totalLeaves: 25,
  leavesTaken: 12,
  pendingLeaves: 3,
  averageSleepScore: 82,
  tasks: [
    { id: 'T1', title: 'Site Inspection: Tech Park', description: 'Safety compliance audit for Phase 2', status: 'pending', dueDate: '2024-05-20', priority: 'high', location: '7th Ave Tech Park' },
    { id: 'T2', title: 'Client Meeting: Horizon Hub', description: 'Monthly project sync', status: 'completed', dueDate: '2024-05-15', priority: 'medium', location: 'Downtown Plaza' },
    { id: 'T3', title: 'Route Optimization', description: 'Review fuel efficiency for field team', status: 'pending', dueDate: '2024-05-22', priority: 'low' },
  ],
  attendance: [
    { id: 'A1', date: '2024-05-15', loginTime: '08:45 AM', logoutTime: '05:30 PM', status: 'present', locationName: 'Main Office' },
    { id: 'A2', date: '2024-05-16', loginTime: '09:15 AM', logoutTime: '06:00 PM', status: 'present', locationName: 'Tech Park Site' },
  ],
  salaryHistory: [
    { id: 'S1', month: 'April', year: 2024, baseSalary: 8500, bonus: 500, deductions: 200, netPay: 8800, status: 'paid' },
    { id: 'S2', month: 'March', year: 2024, baseSalary: 8500, bonus: 200, deductions: 200, netPay: 8500, status: 'paid' },
  ]
};

export const MOCK_TEAM: TeamMember[] = [
  { id: 'M1', name: 'Sarah Chen', role: 'Sales Lead', status: 'on-site', lastLocation: 'Central Mall', avatar: 'Sarah' },
  { id: 'M2', name: 'James Wilson', role: 'Operations', status: 'online', lastLocation: 'Headquarters', avatar: 'James' },
  { id: 'M3', name: 'Elena Rodriguez', role: 'Support', status: 'offline', lastLocation: 'Home Office', avatar: 'Elena' },
  { id: 'M4', name: 'David Kim', role: 'Field Tech', status: 'on-site', lastLocation: 'Bridge Project', avatar: 'David' },
];

export const NAVIGATION = [
  { name: 'Dashboard', icon: 'fa-gauge-high', id: 'dashboard' },
  { name: 'Field Maps', icon: 'fa-map-location-dot', id: 'maps' },
  { name: 'Attendance', icon: 'fa-clock-rotate-left', id: 'attendance' },
  { name: 'Task Board', icon: 'fa-list-check', id: 'tasks' },
  { name: 'Salary Hub', icon: 'fa-file-invoice-dollar', id: 'salary' },
  { name: 'Leaves', icon: 'fa-calendar-day', id: 'leaves' },
];
