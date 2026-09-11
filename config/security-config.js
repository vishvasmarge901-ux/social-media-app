// Security configuration and constants

export const SECURITY_CONFIG = {
  // Password requirements
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: true,
  },

  // Session management
  SESSION: {
    TIMEOUT: 30 * 60 * 1000, // 30 minutes in milliseconds
    TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
    MAX_REFRESH_ATTEMPTS: 3,
  },

  // API security
  API: {
    REQUEST_TIMEOUT: 30000, // 30 seconds
    MAX_RETRIES: 3,
    RATE_LIMIT: 100, // requests per minute
  },

  // File upload security
  FILE_UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10 MB
    ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    MIN_IMAGE_WIDTH: 100,
    MIN_IMAGE_HEIGHT: 100,
    MAX_IMAGE_WIDTH: 4096,
    MAX_IMAGE_HEIGHT: 4096,
  },

  // Data validation
  VALIDATION: {
    USERNAME_PATTERN: /^[a-zA-Z0-9_]{3,20}$/,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_PATTERN: /^[\d\s\-\+\(\)]{10,}$/,
  },

  // Security headers
  HEADERS: {
    'Content-Security-Policy': "default-src 'self'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  },
};

// Security error messages
export const SECURITY_ERRORS = {
  INVALID_EMAIL: 'Please enter a valid email address',
  WEAK_PASSWORD: 'Password does not meet security requirements',
  INVALID_USERNAME: 'Username must be 3-20 characters and contain only letters, numbers, and underscores',
  FILE_TOO_LARGE: 'File size exceeds maximum limit',
  INVALID_FILE_TYPE: 'File type is not supported',
  SUSPICIOUS_INPUT: 'Input contains suspicious patterns',
  SESSION_EXPIRED: 'Your session has expired. Please login again',
  UNAUTHORIZED: 'You do not have permission to access this resource',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later',
};
