import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { MetricCard } from '../components/MetricCard';
import { ActivityTable } from '../components/ActivityTable';
import { SecurityBanner } from '../components/SecurityBanner';
import type { MetricData, SecurityEvent, PipelineStatus } from '../types/dashboard';
import { CheckCircle2, GitCommit, Shield, RefreshCw } from 'lucide-react';

const MOCK_METRICS: MetricData[] = [
  {
    id: 'm1',
    title: 'معدل أمان الكود (SAST Score)',
    value: '99.4%',
    change: '+1.2%',
    isPositive: true,
    category: 'security',
    description: '0 ثغرات حرج أو عالي بناءً على كشف SonarQube',
  },
  {
    id: 'm2',
    title: 'فحوصات الاعتمادية (Snyk/Trivy)',
    value: '0 CVEs',
    change: 'Clean',
    isPositive: true,
    category: 'compliance',
    description: 'جميع المكتبات المستعملة محدثة وآمنة',
  },
  {
    id: 'm3',
    title: 'نجاح مسارات CI/CD',
    value: '100%',
    change: 'Stable',
    isPositive: true,
    category: 'pipelines',
    description: 'تم اجتياز جميع البوابات الأمنية بنجاح',
  },
  {
    id: 'm4',
    title: 'مستوى التغطية (Test Coverage)',
    value: '94.8%',
    change: '+3.5%',
    isPositive: true,
    category: 'performance',
    description: 'الوحدات والتكامل مغطاة باختبارات تلقائية',
  },
];

const MOCK_EVENTS: SecurityEvent[] = [
  {
    id: 'evt-101',
    timestamp: '2026-07-22 20:15:00',
    severity: 'INFO',
    service: 'Vite Production Build',
    description: 'تم إنشاء الحزمة الإنتاجية المجمعة بنجاح بدون أخطاء TypeScript',
    status: 'PASSED',
  },
  {
    id: 'evt-102',
    timestamp: '2026-07-22 20:14:20',
    severity: 'INFO',
    service: 'Static Code Analysis (Oxlint/ESLint)',
    description: 'فحص جودة الكود: لم يتم العثور على أخطاء تنسيقية أو متغيرات غير مستخدمة',
    status: 'RESOLVED',
  },
  {
    id: 'evt-103',
    timestamp: '2026-07-22 20:10:11',
    severity: 'INFO',
    service: 'Secret Detector (Gitleaks/Trufflehog)',
    description: 'فحص التغييرات المحسوبة: لم يتم اكتشاف أي API Keys أو Secrets',
    status: 'PASSED',
  },
  {
    id: 'evt-104',
    timestamp: '2026-07-22 19:45:30',
    severity: 'LOW',
    service: 'Dependency Audit (npm audit)',
    description: 'تم فحص شجرة المكتبات: 0 ثغرات أمنية في الاعتماديات',
    status: 'PASSED',
  },
];

const MOCK_PIPELINES: PipelineStatus[] = [
  {
    name: 'Build & Lint Job',
    branch: 'main',
    sastPassed: true,
    dastPassed: true,
    dependencyCheckPassed: true,
    status: 'SUCCESS',
    lastRun: 'منذ 5 دقائق',
  },
  {
    name: 'OWASP Security Gate Scan',
    branch: 'main',
    sastPassed: true,
    dastPassed: true,
    dependencyCheckPassed: true,
    status: 'SUCCESS',
    lastRun: 'منذ 12 دقيقة',
  },
  {
    name: 'Docker Container Security Scan',
    branch: 'main',
    sastPassed: true,
    dastPassed: true,
    dependencyCheckPassed: true,
    status: 'SUCCESS',
    lastRun: 'منذ 25 دقيقة',
  },
];

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="dashboard-main-content">
          <div className="content-header">
            <div>
              <h1 className="page-title">لوحة تحكم DevSecOps والأمان</h1>
              <p className="page-subtitle">
                نظام مراقبة الفحوصات الأمنية وجودة الكود للمشروع التجريبي <code>secure-test-app</code>
              </p>
            </div>

            <div className="header-actions">
              <button
                onClick={handleRefresh}
                className={`refresh-btn ${isRefreshing ? 'spin' : ''}`}
                title="تحديث البيانات"
              >
                <RefreshCw size={16} />
                <span>تحديث الفحوصات</span>
              </button>
            </div>
          </div>

          <SecurityBanner />

          <section className="metrics-grid">
            {MOCK_METRICS.map((metric) => (
              <MetricCard key={metric.id} data={metric} />
            ))}
          </section>

          <div className="dashboard-two-columns">
            <div className="left-column">
              <ActivityTable events={MOCK_EVENTS} />
            </div>

            <div className="right-column">
              <div className="pipelines-card">
                <div className="pipelines-header">
                  <h3>مسارات الاختبار الأمني (CI/CD Gates)</h3>
                  <Shield size={18} className="text-cyan" />
                </div>

                <div className="pipelines-list">
                  {MOCK_PIPELINES.map((pipeline, idx) => (
                    <div key={idx} className="pipeline-item">
                      <div className="pipeline-info">
                        <div className="pipeline-name-row">
                          <GitCommit size={16} />
                          <span className="pipeline-name">{pipeline.name}</span>
                        </div>
                        <span className="pipeline-meta">
                          فرع: <code>{pipeline.branch}</code> • {pipeline.lastRun}
                        </span>
                      </div>

                      <div className="pipeline-badges">
                        <span className="gate-badge">SAST PASS</span>
                        <span className="gate-badge">SCA PASS</span>
                        <span className="status-indicator success">
                          <CheckCircle2 size={16} />
                          <span>ناجح</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
