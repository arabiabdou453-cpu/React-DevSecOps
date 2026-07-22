import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  GitBranch,
  FileCheck2,
  Lock,
  Settings,
  Server,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'scans', label: 'فحوصات الأمان', icon: ShieldAlert, count: '0 Critical' },
    { id: 'pipelines', label: 'مسارات CI/CD', icon: GitBranch },
    { id: 'compliance', label: 'الامتثال والمعايير', icon: FileCheck2 },
    { id: 'secrets', label: 'إدارة المفاتيح (Vault)', icon: Lock },
    { id: 'infrastructure', label: 'البنية التحتية', icon: Server },
    { id: 'settings', label: 'الإعدادات الأمنية', icon: Settings },
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-section-label">DevSecOps Suite</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.count && <span className="nav-badge success">{item.count}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="security-shield-status">
          <div className="status-dot online"></div>
          <div className="status-text">
            <span>DevSecOps Template v1.0</span>
            <small>OWASP Top 10 Compliant</small>
          </div>
        </div>
      </div>
    </aside>
  );
};
