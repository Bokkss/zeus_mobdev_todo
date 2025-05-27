import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F1EFEC',
    width: '100%',
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#F1EFEC',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: Platform.OS === 'android' ? 0 : undefined,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#030303',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default Header;
