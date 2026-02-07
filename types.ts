
export type EmployeeRole = 'Software Engineer' | 'Field Manager' | 'Designer' | 'Sales Executive' | 'DevOps Lead';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  location?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  loginTime: string;
  logoutTime: string | null;
  status: 'present' | 'late' | 'half-day';
  locationName?: string;
  latLng?: { lat: number, lng: number };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'on-site' | 'offline';
  lastLocation: string;
  avatar: string;
}

export interface EmployeeProfile {
  id: string;
  name: string;
  role: EmployeeRole;
  email: string;
  totalLeaves: number;
  leavesTaken: number;
  pendingLeaves: number;
  averageSleepScore: number;
  tasks: Task[];
  attendance: AttendanceRecord[];
  salaryHistory: any[];
}
