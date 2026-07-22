import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { config } from '../config/env';

export const LoginPage: React.FC = () => {
  const { login, isLocked, loginAttempts } = useAuth();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isLocked) {
      setErrorMessage('تم قفل الحساب بسبب تجاوز عدد محاولات الدخول المسموح بها.');
      return;
    }

    setIsLoading(true);

    // Simulate small latency for timing attack prevention & UX smooth transition
    setTimeout(() => {
      const result = login({ email, passcode });
      setIsLoading(false);

      if (!result.success) {
        setErrorMessage(result.error || 'حدث خطأ أثناء الدخول.');
      }
    }, 400);
  };

  const fillDemoCredentials = () => {
    setEmail('devsecops.admin@enterprise.local');
    setPasscode('SecureP@ssw0rd2026!');
    setErrorMessage(null);
  };

  return (
    <div className="login-page">
      <div className="login-card-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="security-icon-circle">
              <ShieldCheck size={36} className="brand-icon" />
            </div>
            <h1>{config.appTitle}</h1>
            <p className="login-subtitle">تسجيل الدخول إلى لوحة الأمان والتحكم Enterprise</p>
          </div>

          {errorMessage && (
            <div className="alert-box error" role="alert">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {isLocked && (
            <div className="alert-box warning">
              <Lock size={18} />
              <span>
                الحساب مقفل حالياً. المحاولات الفاشلة: {loginAttempts} من أصل {config.maxLoginAttempts}.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="login-email">البريد الإلكتروني المهني</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  disabled={isLocked || isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-passcode">كلمة المرور / الرمز البرمجي</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  id="login-passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  disabled={isLocked || isLoading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLocked || isLoading}
            >
              {isLoading ? (
                <span className="spinner-text">جاري التحقق الأمني...</span>
              ) : (
                <>
                  <span>تسجيل الدخول الآمن</span>
                  <ArrowLeft size={18} />
                </>
              )}
            </button>
          </form>

          <div className="demo-helper">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="fill-demo-btn"
              disabled={isLocked || isLoading}
            >
              تعبئة بيانات تجريبية (Demo Data)
            </button>
            <div className="security-note">
              <span>🔒 التشفير محلي والبيانات لا تُرسل لخوادم خارجية</span>
            </div>
          </div>
        </div>

        <div className="login-footer-info">
          <span>Enterprise Secure Portal v1.0 • DevSecOps Test Application</span>
        </div>
      </div>
    </div>
  );
};
