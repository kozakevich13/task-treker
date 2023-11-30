

import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import TaskList from './TaskList';


const Main = ({navigation }) => {

  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  const addDailyTaskToMain = useCallback((newTask) => {
    setTasks([...tasks, newTask]);
  }, [tasks]);

  useEffect(() => {
    updateCompletedCount();
  }, [tasks]); // Запускати updateCompletedCount при зміні стану tasks

  const addTask = () => {
    if (taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setTaskText('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const updateCompletedCount = () => {
    const count = tasks.filter((task) => task.completed).length;
    setCompletedCount(count);
  };



  return (
    <View style={styles.container}>
    <Text>main page!</Text>
    <Button
        title="Go to Daily Tasks"
        onPress={() =>
          navigation.navigate('DailyTasks', {
            addDailyTaskToMain: addDailyTaskToMain,
          })
        }
        
      />
    <TextInput
      style={styles.input}
      placeholder="Enter task"
      value={taskText}
      onChangeText={(text) => setTaskText(text)}
    />
    <Button title="Add Task" onPress={addTask} />
    <Text>Total Completed Tasks: {completedCount}</Text>
    <TaskList tasks={tasks} toggleTask={toggleTask} />
  </View>
  );
}


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

export default Main;
