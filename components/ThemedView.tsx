import { View, type ViewProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, styles.base, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#F1EFEC',
  },
});
