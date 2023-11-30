import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import CheckBox from 'expo-checkbox';

const Task = ({ task, toggleTask }) => {
  return (
    <TouchableOpacity 
      style={styles.taskContainer}
      onPress={() => toggleTask(task.id)}
    >
      <CheckBox
        value={task.completed}
        onValueChange={() => toggleTask(task.id)}
      />
      <Text style={styles.taskText}>{task.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  taskText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Task;
