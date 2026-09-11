// Security event logging
import { storageSet, storageGet } from './storage';

export const LOG_LEVELS = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  SECURITY: 'SECURITY',
};

// Log event
export const logEvent = async (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    data,
  };

  try {
    const logs = (await storageGet('appLogs')) || [];
    logs.push(logEntry);

    // Keep only last 1000 logs
    if (logs.length > 1000) {
      logs.shift();
    }

    await storageSet('appLogs', logs);
    console.log(`[${level}] ${message}`, data);
  } catch (error) {
    console.error('Logging error:', error);
  }
};

// Log security event
export const logSecurityEvent = async (eventType, details = {}) => {
  await logEvent(LOG_LEVELS.SECURITY, `Security Event: ${eventType}`, details);
};

// Log error
export const logError = async (error, context = {}) => {
  await logEvent(LOG_LEVELS.ERROR, error.message, {
    stack: error.stack,
    ...context,
  });
};

// Get logs
export const getLogs = async (filter = {}) => {
  try {
    let logs = (await storageGet('appLogs')) || [];

    if (filter.level) {
      logs = logs.filter((log) => log.level === filter.level);
    }

    if (filter.startTime) {
      logs = logs.filter((log) => new Date(log.timestamp) >= filter.startTime);
    }

    if (filter.endTime) {
      logs = logs.filter((log) => new Date(log.timestamp) <= filter.endTime);
    }

    return logs;
  } catch (error) {
    console.error('Logs retrieval error:', error);
    return [];
  }
};

// Clear logs
export const clearLogs = async () => {
  try {
    await storageSet('appLogs', []);
    return true;
  } catch (error) {
    console.error('Logs clear error:', error);
    return false;
  }
};
