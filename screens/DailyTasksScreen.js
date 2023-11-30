// DailyTasksScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const DailyTasksScreen = () => {
  const [dailyTaskText, setDailyTaskText] = useState('');
  const [dailyTasks, setDailyTasks] = useState([]);

  const addDailyTask = () => {
    if (dailyTaskText) {
      const newDailyTask = {
        id: Date.now(),
        text: dailyTaskText,
      };

      setDailyTasks([...dailyTasks, newDailyTask]);
      setDailyTaskText('');
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
