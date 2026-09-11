// Authentication utilities
import { hashPassword, generateToken } from './encryption';
import { secureStorageSet, secureStorageGet, secureStorageRemove } from './storage';

// User authentication context
export const AuthContext = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Login user
export const loginUser = async (email, password) => {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      return { success: false, error: 'Password hashing failed' };
    }

    // Generate token
    const token = await generateToken();
    if (!token) {
      return { success: false, error: 'Token generation failed' };
    }

    // Store auth data securely
    const userData = { email, token, loginTime: new Date().toISOString() };
    await secureStorageSet('authToken', token);
    await secureStorageSet('userData', userData);

    AuthContext.isAuthenticated = true;
    AuthContext.user = userData;
    AuthContext.token = token;

    return { success: true, data: userData };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await secureStorageRemove('authToken');
    await secureStorageRemove('userData');

    AuthContext.isAuthenticated = false;
    AuthContext.user = null;
    AuthContext.token = null;

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

// Check if user is authenticated
export const isUserAuthenticated = async () => {
  try {
    const token = await secureStorageGet('authToken');
    const userData = await secureStorageGet('userData');

    if (token && userData) {
      AuthContext.isAuthenticated = true;
      AuthContext.user = userData;
      AuthContext.token = token;
      return true;
    }
    return false;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
};

// Refresh token
export const refreshAuthToken = async () => {
  try {
    const token = await generateToken();
    if (!token) {
      return { success: false, error: 'Token generation failed' };
    }

    const userData = await secureStorageGet('userData');
    if (userData) {
      userData.token = token;
      userData.lastRefresh = new Date().toISOString();
      await secureStorageSet('authToken', token);
      await secureStorageSet('userData', userData);
      AuthContext.token = token;
      return { success: true, token };
    }

    return { success: false, error: 'User data not found' };
  } catch (error) {
    console.error('Token refresh error:', error);
    return { success: false, error: error.message };
  }
};
