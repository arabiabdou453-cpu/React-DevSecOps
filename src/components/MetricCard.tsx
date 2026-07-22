import React from 'react';
import { ArrowUpRight, ArrowDownRight, Shield, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import type { MetricData } from '../types/dashboard';

interface MetricCardProps {
  data: MetricData;
}

export const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const getCategoryIcon = (category: MetricData['category']) => {
    switch (category) {
      case 'security':
        return <Shield className="card-icon text-cyan" size={22} />;
      case 'compliance':
        return <CheckCircle2 className="card-icon text-emerald" size={22} />;
      case 'performance':
        return <Cpu className="card-icon text-purple" size={22} />;
      case 'pipelines':
        return <AlertTriangle className="card-icon text-amber" size={22} />;
      default:
        return <Shield className="card-icon" size={22} />;
    }
  };

  return (
    <div className="metric-card">
      <div className="card-header">
        <span className="card-title">{data.title}</span>
        {getCategoryIcon(data.category)}
      </div>

      <div className="card-body">
        <div className="card-value">{data.value}</div>
        <div className={`card-change ${data.isPositive ? 'positive' : 'negative'}`}>
          {data.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{data.change}</span>
        </div>
      </div>

      <div className="card-footer">
        <span className="card-description">{data.description}</span>
      </div>
    </div>
  );
};
