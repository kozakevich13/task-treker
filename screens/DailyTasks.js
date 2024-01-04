// DailyTasks.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DailyTasks = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = () => {
    let newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      repeat: true,
      repeat_num: 0,
      disabled: false,
    };
    if (task.trim() !== "") {
      setTasks([...tasks, newTask]);
      setTask("");
      saveTasks([...tasks, newTask]);
      addTaskToMainList(newTask);
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    saveTasks(tasks.filter((t) => t.id !== taskId));
  };

  const saveTasks = async (tasks) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("dailyTasks", jsonTasks);
    } catch (error) {
      console.error("Error saving tasks: ", error);
    }
  };

  const loadTasks = async () => {
    try {
      const jsonTasks = await AsyncStorage.getItem("dailyTasks");
      if (jsonTasks) {
        setTasks(JSON.parse(jsonTasks));
      }
    } catch (error) {
      console.error("Error loading tasks: ", error);
    }
  };

  const addTaskToMainList = async (newTask) => {
    try {
      const jsonMainTasks = await AsyncStorage.getItem("tasks");
      let mainTasks = jsonMainTasks ? JSON.parse(jsonMainTasks) : [];
      mainTasks.push(newTask);
      const jsonUpdatedMainTasks = JSON.stringify(mainTasks);
      await AsyncStorage.setItem("tasks", jsonUpdatedMainTasks);
    } catch (error) {
      console.error("Error adding task to main list: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text
              style={{
                textDecorationLine: item.completed,
              }}
            >
              {item.text}
            </Text>
            <Text
              style={{
                textDecorationLine: item.completed,
              }}
            >
              {item.repeat_num}
            </Text>
            <Button title="Remove" onPress={() => removeTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default DailyTasks;
