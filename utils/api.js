// API utility with security features
import { secureStorageGet } from './storage';
import { sanitizeInput } from './validation';

const API_BASE_URL = 'https://api.yourdomain.com';
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Create headers with authentication
const createHeaders = async () => {
  const token = await secureStorageGet('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'SocialMediaApp/1.0.0',
  };
};

// Make API request with security
export const apiRequest = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    body = null,
    timeout = REQUEST_TIMEOUT,
    retries = 3,
  } = options;

  try {
    // Sanitize endpoint
    const sanitizedEndpoint = sanitizeInput(endpoint);

    const headers = await createHeaders();
    const url = `${API_BASE_URL}${sanitizedEndpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    if (retries > 0 && error.name !== 'AbortError') {
      return apiRequest(endpoint, { ...options, retries: retries - 1 });
    }
    console.error('API request error:', error);
    return { success: false, error: error.message };
  }
};

// Upload file with security checks
export const uploadFile = async (fileUri, endpoint, fileType = 'image/jpeg') => {
  try {
    const headers = await createHeaders();
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: fileType,
      name: `upload_${Date.now()}`,
    });

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('File upload error:', error);
    return { success: false, error: error.message };
  }
};
