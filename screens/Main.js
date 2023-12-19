import React, { useState, useEffect, useCallback } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskList from "./TaskList";

const Main = ({ navigation }) => {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  const addDailyTaskToMain = useCallback(
    (newTask) => {
      setTasks([...tasks, newTask]);
    },
    [tasks]
  );

  useEffect(() => {
    // Завантаження завдань з локального сховища при монтажі компонента
    loadTasks();
  }, []);

  useEffect(() => {
    // Збереження завдань в локальному сховищі при зміні стану tasks
    saveTasks();
    updateCompletedCount();
  }, [tasks]);

  const addTask = () => {
    if (taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setTaskText("");
    }
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateCompletedCount = () => {
    const count = tasks.filter((task) => task.completed).length;
    setCompletedCount(count);
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Main page!</Text>
      <Button
        title="Go to Daily Tasks"
        onPress={() =>
          navigation.navigate("DailyTasks", {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 20,
    paddingHorizontal: 8,
  },
});

export default Main;
