import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const editcompleted = () => {
  const [
    [_1, item_id],
    [_2, item_name],
    [_3, item_description]
  ] = useSearchParams();

  const [title, setTitle] = useState(item_name);
  const [details, setDetails] = useState(item_description);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://todo-list.dcism.org/editItem_action.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          item_id,
          item_name: title,
          item_description: details
        }),
      });

      setIsLoading(false);
      Alert.alert('Success', 'Task edited successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      router.replace('/completed');
    }
  };

  const handleChangeStatus = async () => {
    setIsLoading(true);
    const isActive = false;

    try {
      const response = await fetch(`https://todo-list.dcism.org/statusItem_action.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          status: isActive ? 'inactive' : 'active',
          item_id
        }),
      });

      setIsLoading(false);
      Alert.alert('Success', 'Changed task status successfully!');
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      router.replace('/completed');
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://todo-list.dcism.org/deleteItem_action.php?item_id=${item_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      const data = await response.json();
      console.log(data);

      setIsLoading(false);
      Alert.alert('Success', 'Task Deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      router.replace('/completed');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Header title="Edit Completed" />

        <Input
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="none"
          style={styles.field}
        />

        <Input
          editable
          multiline
          numberOfLines={8}
          placeholder="Details"
          maxLength={200}
          onChangeText={setDetails}
          value={details}
          style={styles.field}
        />

        <Button
          label="Save"
          color="#123458"
          style={styles.field}
          onPress={handleUpdate}
        />

        <Button
          label="Mark Incomplete"
          color="#FF991C"
          style={styles.field}
          onPress={handleChangeStatus}
        />

        <Button
          label="Delete"
          color="#D32F2F"
          style={styles.field}
          onPress={handleDelete}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
  },
  field: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default editcompleted;
