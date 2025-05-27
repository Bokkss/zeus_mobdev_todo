import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState('Loading...');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('user_name');
        if (storedName) {
          setName(storedName);
        }
      } catch (error) {
        console.error('Error fetching name from AsyncStorage:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Your Profile</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Logged in as</Text>
          <Text style={styles.name}>{name}</Text>
        </View>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#030303',
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 480,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#123458',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#030303',
    textAlign: 'center',
  },
  signOutButton: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#123458',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: '#F1EFEC',
    fontWeight: '600',
    fontSize: 16,
  },
});
