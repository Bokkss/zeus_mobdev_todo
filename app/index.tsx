import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    setIsLoading(true);

    const response = await fetch(`https://todo-list.dcism.org/signin_action.php?email=${email}&password=${password}`, {
      method: 'GET'
    });

    const data = await response.json();

    if (data.status === 200) {
      const { id, fname, lname } = data.data;
      AsyncStorage.setItem('user_id', `${id}`);
      AsyncStorage.setItem('user_name', `${fname} ${lname}`);
      router.replace('/todo');
      return;
    }

    Alert.alert('Error', 'Invalid username or password.');
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Welcome Back</Text>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.field}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.field}
        />

        <TouchableOpacity style={[styles.signInButton, styles.field]} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.signUpButton, styles.field]} onPress={() => router.replace('/signup')}>
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1EFEC',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#030303',
    marginBottom: 24,
    textAlign: 'center',
  },
  field: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: '#123458',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signInText: {
    color: '#F1EFEC',
    fontWeight: '600',
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#030303',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signUpText: {
    color: '#F1EFEC',
    fontWeight: '600',
    fontSize: 16,
  },
});
