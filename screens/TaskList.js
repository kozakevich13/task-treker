import React from 'react';
import { View, FlatList } from 'react-native';
import Task from './Task';

const TaskList = ({ tasks, toggleTask }) => {

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });
  return (
    <View>
      <FlatList
        data={sortedTasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => (
          <Task task={item} toggleTask={toggleTask} />
        )}
      />
    </View>
  );
};

export default TaskList;
