// Secure storage utility
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store sensitive data securely
export const secureStorageSet = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Secure storage error:', error);
    return false;
  }
};

// Retrieve sensitive data
export const secureStorageGet = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Secure storage retrieval error:', error);
    return null;
  }
};

// Remove sensitive data
export const secureStorageRemove = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (error) {
    console.error('Secure storage removal error:', error);
    return false;
  }
};

// Store non-sensitive data
export const storageSet = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
};

// Retrieve non-sensitive data
export const storageGet = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Storage retrieval error:', error);
    return null;
  }
};

// Remove non-sensitive data
export const storageRemove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Storage removal error:', error);
    return false;
  }
};

// Clear all storage
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Clear storage error:', error);
    return false;
  }
};
