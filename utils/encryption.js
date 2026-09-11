// Encryption utility for sensitive data
import * as Crypto from 'expo-crypto';

const SECRET_KEY = 'your-secret-key-change-this';

// Encrypt sensitive data
export const encryptData = async (data) => {
  try {
    const encrypted = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data + SECRET_KEY
    );
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

// Hash password
export const hashPassword = async (password) => {
  try {
    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hashed;
  } catch (error) {
    console.error('Password hashing error:', error);
    return null;
  }
};

// Generate random token
export const generateToken = async () => {
  try {
    const token = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Math.random().toString(36).substr(2, 9) + Date.now()
    );
    return token;
  } catch (error) {
    console.error('Token generation error:', error);
    return null;
  }
};

// Validate password strength
export const validatePasswordStrength = (password) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const strength = Object.values(requirements).filter(Boolean).length;
  return {
    score: strength,
    maxScore: 5,
    requirements,
    isStrong: strength >= 4,
  };
};
