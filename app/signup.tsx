import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function SignUpScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`https://todo-list.dcism.org/signup_action.php/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.status !== 200) {
        Alert.alert('Error', data.message || 'Failed to sign up.');
        setIsLoading(false);
        return;
      }

      Alert.alert('Success', 'Account created successfully!');
      router.replace('/');
    } catch (error: any) {
      console.error('Signup Error:', error);
      Alert.alert('Error', error.message || 'Failed to sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* 🔽 App logo at the top */}
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Create Account</Text>

        <Input placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.field} />
        <Input placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.field} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.field} />
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.field} />
        <Input placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.field} />

        <Button label="Sign Up" onPress={handleSignUp} color="#123458" style={styles.button} />

        <TouchableOpacity style={styles.signInButton} onPress={() => router.replace('/')}>
          <Text style={styles.signInText}>Already have an account? Sign In</Text>
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
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 12,
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
  button: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    marginTop: 8,
  },
  signInButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  signInText: {
    color: '#030303',
    fontWeight: '500',
    fontSize: 14,
  },
});
