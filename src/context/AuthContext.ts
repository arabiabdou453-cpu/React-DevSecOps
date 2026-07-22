import { createContext } from 'react';
import type { AuthState, LoginCredentials } from '../types/auth';

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => { success: boolean; error?: string };
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
