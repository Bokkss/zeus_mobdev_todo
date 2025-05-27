import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export function LoadingScreen({ message = 'Loading…' }: { message?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={60} color="#123458" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1EFEC',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#030303',
    fontWeight: 'bold',
  },
});
