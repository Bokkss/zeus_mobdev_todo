import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ value, onChangeText, style, ...props }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    color: '#030303',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D4C9BE',
  },
});
