// Input validation utilities

// Validate email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate phone number
export const validatePhoneNumber = (phone) => {
  const regex = /^[\d\s\-\+\(\)]{10,}$/;
  return regex.test(phone);
};

// Validate username
export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

// Sanitize input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>"'&]/g, (char) => {
      const escapeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;',
      };
      return escapeMap[char];
    });
};

// Validate file size
export const validateFileSize = (fileSize, maxSizeMB = 10) => {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return fileSize <= maxBytes;
};

// Validate image dimensions
export const validateImageDimensions = (width, height, minWidth = 100, minHeight = 100) => {
  return width >= minWidth && height >= minHeight;
};

// Check for SQL injection patterns
export const hasSQLInjectionPatterns = (input) => {
  const sqlPatterns = /('|(\-\-)|(;)|(\|\|)|(\*))/gi;
  return sqlPatterns.test(input);
};

// Validate URL
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
