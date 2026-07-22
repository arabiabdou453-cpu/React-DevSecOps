import React from 'react';
import { AlertOctagon, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import type { SecurityEvent } from '../types/dashboard';

interface ActivityTableProps {
  events: SecurityEvent[];
}

export const ActivityTable: React.FC<ActivityTableProps> = ({ events }) => {
  const getSeverityBadge = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="badge badge-critical"><AlertOctagon size={12} /> حرج</span>;
      case 'HIGH':
        return <span className="badge badge-high"><AlertTriangle size={12} /> مرتفع</span>;
      case 'MEDIUM':
        return <span className="badge badge-medium">متوسط</span>;
      case 'LOW':
        return <span className="badge badge-low">منخفض</span>;
      case 'INFO':
        return <span className="badge badge-info"><Info size={12} /> معلومة</span>;
      default:
        return <span className="badge">{severity}</span>;
    }
  };

  const getStatusBadge = (status: SecurityEvent['status']) => {
    switch (status) {
      case 'PASSED':
      case 'RESOLVED':
        return <span className="status-chip success"><CheckCircle size={12} /> تم الفحص بنجاح</span>;
      case 'INVESTIGATING':
        return <span className="status-chip warning">قيد المعالجة</span>;
      case 'OPEN':
        return <span className="status-chip danger">مفتوح</span>;
      default:
        return <span className="status-chip">{status}</span>;
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3 className="table-title">سجل الأحداث وفحوصات الأمان (Audit & SAST Log)</h3>
        <span className="table-subtitle">يُحدث تلقائياً مع كل مسار CI/CD</span>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>الوقت والتاريخ</th>
              <th>مستوى الخطورة</th>
              <th>الخدمة / المكون</th>
              <th>تفاصيل الفحص</th>
              <th>الحالة الأمنية</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="timestamp-cell">{event.timestamp}</td>
                <td>{getSeverityBadge(event.severity)}</td>
                <td className="service-cell">{event.service}</td>
                <td className="desc-cell">{event.description}</td>
                <td>{getStatusBadge(event.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
