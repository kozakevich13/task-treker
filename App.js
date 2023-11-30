import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import TaskList from './screens/TaskList';

const App = () => {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

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
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
      />
      <Button title="Add Task" onPress={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} />
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

export default App;
