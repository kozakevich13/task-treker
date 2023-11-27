import React from 'react';
import { View, FlatList } from 'react-native';
import Task from './Task';

const TaskList = ({ tasks, toggleTask }) => {
  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => (
          <Task task={item} toggleTask={toggleTask} />
        )}
      />
    </View>
  );
};

export default TaskList;
