export interface User {
  id: string;
  name: string;
  email: string;
  role: 'DevSecOps Admin' | 'Security Auditor' | 'Developer';
  avatarUrl?: string;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginAttempts: number;
  isLocked: boolean;
}

export interface LoginCredentials {
  email: string;
  passcode: string;
}
