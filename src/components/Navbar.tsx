import React from 'react';
import { ShieldCheck, LogOut, User as UserIcon, Bell, Activity } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { config } from '../config/env';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="app-navbar">
      <div className="navbar-brand">
        <div className="brand-logo">
          <ShieldCheck className="icon-shield" size={24} />
        </div>
        <div className="brand-text">
          <span className="brand-title">{config.appTitle}</span>
          <span className="brand-badge">{config.appEnv.toUpperCase()}</span>
        </div>
      </div>

      <div className="navbar-actions">
        <div className="system-status-indicator">
          <Activity size={16} className="pulse-icon" />
          <span>Security Gateway: Active</span>
        </div>

        <button className="icon-button" title="Notifications" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            <UserIcon size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-role">{user?.role || 'Guest'}</span>
          </div>
        </div>

        <button onClick={logout} className="logout-button" title="تسجيل الخروج" aria-label="Logout">
          <LogOut size={18} />
          <span>خروج</span>
        </button>
      </div>
    </header>
  );
};
