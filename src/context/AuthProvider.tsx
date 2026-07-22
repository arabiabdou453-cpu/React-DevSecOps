import React, { useState, useEffect } from 'react';
import type { User, AuthState, LoginCredentials } from '../types/auth';
import { config } from '../config/env';
import { AuthContext } from './AuthContext';

const DUMMY_USER: User = {
  id: 'usr_sec_99182',
  name: 'DevSecOps Specialist',
  email: 'security.admin@enterprise.local',
  role: 'DevSecOps Admin',
  lastLogin: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = sessionStorage.getItem('secure_session_active');
    if (saved === 'true') {
      return {
        user: DUMMY_USER,
        isAuthenticated: true,
        loginAttempts: 0,
        isLocked: false,
      };
    }
    return {
      user: null,
      isAuthenticated: false,
      loginAttempts: 0,
      isLocked: false,
    };
  });

  useEffect(() => {
    if (authState.isAuthenticated) {
      sessionStorage.setItem('secure_session_active', 'true');
    } else {
      sessionStorage.removeItem('secure_session_active');
    }
  }, [authState.isAuthenticated]);

  const login = (credentials: LoginCredentials): { success: boolean; error?: string } => {
    if (authState.isLocked) {
      return {
        success: false,
        error: 'الحساب مغلق مؤقتاً بسبب المحاولات المتكررة. يرجى المحاولة لاحقاً.',
      };
    }

    const cleanEmail = credentials.email.trim().toLowerCase();
    const cleanPasscode = credentials.passcode.trim();

    if (!cleanEmail || !cleanPasscode) {
      return { success: false, error: 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.' };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: 'صيغة البريد الإلكتروني غير صحيحة.' };
    }

    if (cleanPasscode.length < 6) {
      const newAttempts = authState.loginAttempts + 1;
      const isNowLocked = newAttempts >= config.maxLoginAttempts;

      setAuthState((prev) => ({
        ...prev,
        loginAttempts: newAttempts,
        isLocked: isNowLocked,
      }));

      return {
        success: false,
        error: isNowLocked
          ? 'تم تجاوز الحد الأقصى للمحاولات. تم قفل الحساب لحماية النظام.'
          : `كلمة المرور يجب أن لا تقل عن 6 خانات. (المحاولة ${newAttempts} من ${config.maxLoginAttempts})`,
      };
    }

    const loggedInUser: User = {
      ...DUMMY_USER,
      email: cleanEmail,
      name: cleanEmail.split('@')[0].toUpperCase(),
      lastLogin: new Date().toISOString(),
    };

    setAuthState({
      user: loggedInUser,
      isAuthenticated: true,
      loginAttempts: 0,
      isLocked: false,
    });

    return { success: true };
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      loginAttempts: 0,
      isLocked: false,
    });
    sessionStorage.removeItem('secure_session_active');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
