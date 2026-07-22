import React from 'react';
import { ShieldCheck, Check, Terminal, ExternalLink } from 'lucide-react';

export const SecurityBanner: React.FC = () => {
  const securityControls = [
    'Strict TypeScript Mode Enabled',
    'No Hardcoded Secrets (Vite Env Externalized)',
    'Zero dangerouslySetInnerHTML',
    'Sanitized Form & Email Inputs',
    'In-Memory Session Verification',
    'OWASP Top 10 Preparedness',
  ];

  return (
    <div className="security-banner">
      <div className="banner-content">
        <div className="banner-icon">
          <ShieldCheck size={32} />
        </div>
        <div className="banner-details">
          <h2>جاهز للفحص الأمني (DevSecOps Ready)</h2>
          <p>
            تم بناء هذا التطبيق التجريبي وفق معايير الأمان Enterprise للتحقق من كفاءة بوابة DevSecOps Template قبل عمل <code>git push</code>.
          </p>
          <div className="control-list">
            {securityControls.map((ctrl, index) => (
              <span key={index} className="control-item">
                <Check size={14} className="icon-check" />
                {ctrl}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="banner-actions">
        <button
          className="btn-secondary"
          onClick={() => alert('المشروع جاهز للفحص بواسطة SonarQube / Semgrep / Trivy / Dependency-Check.')}
        >
          <Terminal size={16} />
          <span>تأكيد حالة الجاهزية</span>
        </button>
        <a
          href="https://owasp.org/www-project-top-ten/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-link"
        >
          <span>دليل OWASP</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};
