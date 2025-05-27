import ITask from '@/types/ITask';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Check, CornerUpLeft, Trash } from 'react-native-feather';

interface TaskProps {
  task: ITask;
  changeStatus: (item_id: number, current_status: string) => void;
  handleDelete: (item_id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, changeStatus, handleDelete }) => {
  const router = useRouter();
  const { item_id, item_name, item_description, status } = task;
  const isCompleted = status === 'inactive';
  const urlParams = `item_id=${item_id}&item_name=${encodeURIComponent(item_name)}&item_description=${encodeURIComponent(item_description)}`;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(isCompleted ? `/edit-completed?${urlParams}` : `/edit?${urlParams}`)}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item_name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item_description}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => changeStatus(item_id, status)} style={styles.iconButton}>
          {isCompleted ? (
            <CornerUpLeft color="#EF6C00" width={20} height={20} />
          ) : (
            <Check color="#2E7D32" width={20} height={20} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(item_id)} style={styles.iconButton}>
          <Trash color="#D32F2F" width={20} height={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 500,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#030303',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
  actions: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  alignSelf: 'center', 
  gap: 12,
  },
  iconButton: {
  padding: 4,
  justifyContent: 'center',
  alignItems: 'center',
},
});
