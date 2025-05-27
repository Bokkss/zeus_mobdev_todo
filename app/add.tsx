import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Add = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const router = useRouter();

  const handleAddTask = async () => {
    if (!title || !details) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const user_id = await AsyncStorage.getItem('user_id');

    try {
      const response = await fetch(`https://todo-list.dcism.org/addItem_action.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          item_name: title,
          item_description: details,
          user_id,
        }),
      });

      const data = await response.json();

      if (data.status !== 200) {
        Alert.alert('Error', data.message || 'Failed to add task.');
        return;
      }

      Alert.alert('Success', 'Task added successfully!');
      router.replace('/todo');
    } catch (error: any) {
      console.error('Add Task Error:', error);
      Alert.alert('Error', error.message || 'Failed to add task.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Header title="Add Task" />

        <Input
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="none"
          style={styles.input}
        />

        <Input
          editable
          multiline
          numberOfLines={8}
          placeholder="Details"
          maxLength={200}
          onChangeText={setDetails}
          value={details}
          style={styles.input}
        />

        <Button
          label="Add Task"
          color="#123458"
          style={styles.button}
          onPress={handleAddTask}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1EFEC',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Add;
