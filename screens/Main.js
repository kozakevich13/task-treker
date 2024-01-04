// Main.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import CheckBox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Main = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [disableCompletedTasks, setDisableCompletedTasks] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadTasks();
    });
    return unsubscribe;
  }, [navigation]);

  const addTask = () => {
    let newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      repeat: false,
      repeat_num: 0,
      disabled: false,
    };
    if (task.trim() !== "") {
      setTasks([...tasks, newTask]);
      setTask("");
      saveTasks([...tasks, newTask]);
      saveDailyTasks([...dailyTasks]);
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    saveTasks(tasks.filter((t) => t.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              completed: !t.completed,
              repeat_num: t.repeat_num + 1,
              disabled: t.repeat, // Disable the checkbox only if repeat is true
            }
          : t
      )
    );

    saveTasks(
      tasks.map((t) =>
        t.id === taskId
          ? { ...t, completed: !t.completed, repeat_num: t.repeat_num + 1 }
          : t
      )
    );

    setDailyTasks(
      dailyTasks.map((t) =>
        t.id === taskId
          ? { ...t, completed: !t.completed, repeat_num: t.repeat_num + 1 }
          : t
      )
    );

    saveDailyTasks(
      dailyTasks.map((t) =>
        t.id === taskId
          ? { ...t, completed: !t.completed, repeat_num: t.repeat_num + 1 }
          : t
      )
    );

    setDisableCompletedTasks(true);

    if (tasks.find((t) => t.id === taskId && t.repeat)) {
      // Apply the timer logic only for tasks with repeat: true
      setTimeout(() => {
        setTasks(
          tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  completed: false,
                  disabled: false, // Reset disabled to false after timer
                }
              : t
          )
        );
        saveTasks(
          tasks.map((t) =>
            t.id === taskId
              ? { ...t, completed: false, repeat_num: t.repeat_num + 1 }
              : t
          )
        );
        setDisableCompletedTasks(false);
      }, 2000);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", jsonTasks);
    } catch (error) {
      console.error("Error saving tasks: ", error);
    }
  };

  const saveDailyTasks = async (tasks) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("dailyTasks", jsonTasks);
    } catch (error) {
      console.error("Error saving tasks: ", error);
    }
  };

  const loadTasks = async () => {
    try {
      const jsonTasks = await AsyncStorage.getItem("tasks");
      if (jsonTasks) {
        setTasks(JSON.parse(jsonTasks));
      }
    } catch (error) {
      console.error("Error loading tasks: ", error);
    }

    try {
      const jsonTasks = await AsyncStorage.getItem("dailyTasks");
      if (jsonTasks) {
        setDailyTasks(JSON.parse(jsonTasks));
      }
    } catch (error) {
      console.error("Error loading tasks: ", error);
    }
  };

  const goToDailyTasks = () => {
    navigation.navigate("DailyTasks");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
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
            <CheckBox
              value={item.completed}
              onValueChange={() => toggleTask(item.id)}
              disabled={item.disabled}
            />
            <Text
              style={{
                textDecorationLine: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
            </Text>
            <Button title="Remove" onPress={() => removeTask(item.id)} />
          </View>
        )}
      />
      <Button title="Go to Daily Tasks" onPress={goToDailyTasks} />
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

export default Main;
