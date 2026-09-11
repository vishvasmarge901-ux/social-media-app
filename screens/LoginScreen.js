import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { loginUser } from '../utils/auth';
import { validateEmail } from '../utils/validation';
import { validatePasswordStrength } from '../utils/encryption';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Logged in successfully!');
      // Navigate to home screen
    } else {
      Alert.alert('Error', result.error || 'Login failed');
    }
  };

  const passwordStrength = validatePasswordStrength(password);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Instagram</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#999" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Password Strength Indicator */}
        {password && (
          <View style={styles.strengthContainer}>
            <View style={styles.strengthBars}>
              {[0, 1, 2, 3, 4].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.strengthBar,
                    index < passwordStrength.score && styles.strengthBarFilled,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.strengthText}>
              {passwordStrength.isStrong ? '✅ Strong' : '⚠️ Weak'}
            </Text>
          </View>
        )}

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Signup')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', fontStyle: 'italic', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#999', marginBottom: 30, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12, height: 48 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#000' },
  errorText: { color: '#e74c3c', fontSize: 12, marginBottom: 12 },
  strengthContainer: { marginBottom: 20 },
  strengthBars: { flexDirection: 'row', gap: 4, marginBottom: 8 },
  strengthBar: { flex: 1, height: 4, backgroundColor: '#ddd', borderRadius: 2 },
  strengthBarFilled: { backgroundColor: '#27ae60' },
  strengthText: { fontSize: 12, color: '#27ae60', fontWeight: 'bold' },
  loginButton: { backgroundColor: '#0095f6', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  loginButtonDisabled: { opacity: 0.6 },
  loginButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  forgotPassword: { color: '#0095f6', textAlign: 'center', marginBottom: 20, fontSize: 14 },
  signupContainer: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { color: '#999', fontSize: 14 },
  signupLink: { color: '#0095f6', fontWeight: 'bold', fontSize: 14 },
});
