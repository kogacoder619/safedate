import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { verifyApi } from '../api';
import { useAppStore } from '../store/appStore';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Step = 'phone' | 'code';

export default function PhoneVerifyScreen() {
  const navigation = useNavigation<Nav>();
  const setPhoneVerified = useAppStore((s) => s.setPhoneVerified);

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendCode = async () => {
    setError('');
    setLoading(true);
    try {
      await verifyApi.sendCode(phone);
      setStep('code');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const checkCode = async () => {
    setError('');
    setLoading(true);
    try {
      const { valid } = await verifyApi.checkCode(phone, code);
      if (valid) {
        setPhoneVerified(phone);
        navigation.replace('Main');
      } else {
        setError('Incorrect code — try again.');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Verify your number</Text>
      <Text style={styles.subtitle}>
        {step === 'phone'
          ? 'Enter your phone number to get started. We use this to keep the community safe.'
          : `We sent a 6-digit code to ${phone}.`}
      </Text>

      {step === 'phone' ? (
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="+1 555 000 0000"
          keyboardType="phone-pad"
          autoFocus
        />
      ) : (
        <TextInput
          style={[styles.input, styles.codeInput]}
          value={code}
          onChangeText={setCode}
          placeholder="123456"
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
        />
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.btn, loading && styles.btnDisabled]}
        onPress={step === 'phone' ? sendCode : checkCode}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>{step === 'phone' ? 'Send Code' : 'Verify'}</Text>
        )}
      </TouchableOpacity>

      {step === 'code' && (
        <TouchableOpacity onPress={() => { setStep('phone'); setCode(''); setError(''); }}>
          <Text style={styles.link}>Change number</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.replace('Main')} style={styles.skipBtn}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 32, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#222', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#666', marginBottom: 28, lineHeight: 22 },
  input: { fontSize: 18, borderWidth: 1.5, borderColor: '#ddd', borderRadius: 12, padding: 14, color: '#222', backgroundColor: '#fafafa', marginBottom: 12 },
  codeInput: { letterSpacing: 8, textAlign: 'center' },
  error: { color: '#e53935', fontSize: 14, marginBottom: 8 },
  btn: { backgroundColor: '#4caf50', paddingVertical: 15, borderRadius: 24, alignItems: 'center', marginBottom: 16 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  link: { textAlign: 'center', color: '#4caf50', fontSize: 14, marginBottom: 24 },
  skipBtn: { alignItems: 'center', marginTop: 8 },
  skipText: { color: '#aaa', fontSize: 13 },
});
