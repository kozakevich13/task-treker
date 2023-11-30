// DailyTasksScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailyTasksScreen = ({ navigation, route }) => {
  const [dailyTaskText, setDailyTaskText] = useState('');
  const [dailyTasks, setDailyTasks] = useState([]);
  const { addDailyTaskToMain } = route.params;

  // Завантаження збережених завдань при монтажі компонента
  useEffect(() => {
    loadDailyTasks();
  }, []);

  // Збереження завдань при їх зміні
  useEffect(() => {
    saveDailyTasks();
  }, [dailyTasks]);

  // Завантаження завдань з AsyncStorage
  const loadDailyTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('dailyTasks');
      if (storedTasks) {
        setDailyTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading daily tasks:', error);
    }
  };

  // Збереження завдань в AsyncStorage
  const saveDailyTasks = async () => {
    try {
      await AsyncStorage.setItem('dailyTasks', JSON.stringify(dailyTasks));
    } catch (error) {
      console.error('Error saving daily tasks:', error);
    }
  };

  const addDailyTask = () => {
    if (dailyTaskText) {
      const newDailyTask = {
        id: Date.now(),
        text: dailyTaskText,
      };

      setDailyTasks([...dailyTasks, newDailyTask]);
      setDailyTaskText('');

      if (addDailyTaskToMain) {
        addDailyTaskToMain(newDailyTask);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter daily task"
        value={dailyTaskText}
        onChangeText={(text) => setDailyTaskText(text)}
      />
      <Button title="Add Daily Task" onPress={addDailyTask} />
      {/* Display the list of daily tasks */}
      {dailyTasks.map((task) => (
        <Text key={task.id}>{task.text}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 20,
    paddingHorizontal: 8,
  },
});

export default DailyTasksScreen;
