import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to home screen</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1EFEC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#123458',
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: '#123458',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F1EFEC',
    fontSize: 16,
    fontWeight: '600',
  },
});
