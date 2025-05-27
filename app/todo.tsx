import Button from '@/components/Button'; // still used in other screens
import Header from '@/components/Header';
import { LoadingScreen } from '@/components/LoadingScreen';
import Task from '@/components/Task';
import ITask from '@/types/ITask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'react-native-feather';

const ToDo = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const user_id = parseInt(await AsyncStorage.getItem('user_id') as string);
      const response = await fetch(
        `https://todo-list.dcism.org/getItems_action.php?status=active&user_id=${user_id}`,
        { method: 'GET' }
      );
      const data = await response.json();
      setTasks(Object.values(data.data));
    } catch (error) {
      Alert.alert('Error fetching tasks:', error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const changeStatus = async (item_id: number, current_status: string) => {
    const isActive = current_status === 'active';

    try {
      await fetch(`https://todo-list.dcism.org/statusItem_action.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          status: isActive ? 'inactive' : 'active',
          item_id,
        }),
      });

      Alert.alert('Success', 'Task status changed successfully!');
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      fetchTasks();
    }
  };

  const handleDelete = async (item_id: number) => {
    try {
      await fetch(`https://todo-list.dcism.org/deleteItem_action.php?item_id=${item_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      Alert.alert('Success', 'Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      fetchTasks();
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Header title="To Do" />

          <View style={styles.tasks}>
            {tasks.length === 0 ? (
              <Text style={styles.noTasksText}>Seems like you do not have anything to do!</Text>
            ) : (
              tasks.map((task) => (
                <Task
                  key={task.item_id}
                  task={task}
                  changeStatus={changeStatus}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.replace('/add')}
          activeOpacity={0.8}
        >
          <Plus stroke="#F1EFEC" width={28} height={28} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1EFEC',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80,
  },
  tasks: {
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  noTasksText: {
    color: '#030303',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 24,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#123458',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
});

export default ToDo;
