import React from 'react';
import { View, Text, StyleSheet, CheckBox } from 'react-native';

const Task = ({ task, toggleTask }) => {
  return (
    <View style={styles.taskContainer}>
      <CheckBox
        value={task.completed}
        onValueChange={() => toggleTask(task.id)}
      />
      <Text style={styles.taskText}>{task.text}</Text>
    </View>
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
