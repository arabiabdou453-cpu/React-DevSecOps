export interface MetricData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  category: 'security' | 'compliance' | 'performance' | 'pipelines';
  description: string;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  service: string;
  description: string;
  status: 'RESOLVED' | 'INVESTIGATING' | 'PASSED' | 'OPEN';
}

export interface PipelineStatus {
  name: string;
  branch: string;
  sastPassed: boolean;
  dastPassed: boolean;
  dependencyCheckPassed: boolean;
  status: 'SUCCESS' | 'SCANNING' | 'FAILED';
  lastRun: string;
}
