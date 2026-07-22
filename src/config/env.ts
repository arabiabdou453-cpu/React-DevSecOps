/**
 * Type-safe Environment Variables Configuration
 * Strictly validates environment inputs to prevent misconfiguration or unexpected runtime values.
 */

interface Config {
  appTitle: string;
  appEnv: string;
  apiBaseUrl: string;
  enableAuditLogs: boolean;
  maxLoginAttempts: number;
}

const getEnvVar = (key: string, defaultValue: string): string => {
  const value = import.meta.env[key];
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  return defaultValue;
};

export const config: Config = {
  appTitle: getEnvVar('VITE_APP_TITLE', 'DevSecOps Portal'),
  appEnv: getEnvVar('VITE_APP_ENV', 'development'),
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'https://api.devsecops.local/v1'),
  enableAuditLogs: getEnvVar('VITE_ENABLE_SECURITY_AUDIT_LOGS', 'true') === 'true',
  maxLoginAttempts: parseInt(getEnvVar('VITE_MAX_LOGIN_ATTEMPTS', '5'), 10) || 5,
};
