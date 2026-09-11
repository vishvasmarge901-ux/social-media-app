// Security middleware for API requests
import { SECURITY_CONFIG } from '../config/security-config';
import { sanitizeInput } from '../utils/validation';
import { logSecurityEvent } from '../utils/logger';

// Rate limiting middleware
export const createRateLimiter = () => {
  const requests = {};

  return (userId) => {
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute

    if (!requests[userId]) {
      requests[userId] = [];
    }

    // Remove old requests
    requests[userId] = requests[userId].filter((time) => time > windowStart);

    // Check limit
    if (requests[userId].length >= SECURITY_CONFIG.API.RATE_LIMIT) {
      return false;
    }

    requests[userId].push(now);
    return true;
  };
};

// Input sanitization middleware
export const sanitizeRequestData = (data) => {
  if (typeof data === 'string') {
    return sanitizeInput(data);
  }

  if (typeof data === 'object' && data !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[sanitizeInput(key)] = sanitizeRequestData(value);
    }
    return sanitized;
  }

  return data;
};

// Security headers middleware
export const addSecurityHeaders = (headers) => {
  return {
    ...headers,
    ...SECURITY_CONFIG.HEADERS,
  };
};

// Token validation middleware
export const validateToken = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // Basic token format validation
  const tokenRegex = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/;
  return tokenRegex.test(token);
};

// CORS middleware
export const verifyCORS = (origin, allowedOrigins) => {
  return allowedOrigins.includes(origin);
};
