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

const Main = ({ navigation }) => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // При завантаженні компонента зчитайте дані з пам'яті телефону
    loadTasks();
  }, []);

  const addTask = () => {
    let newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      repeat: false,
      repeat_num: 0,
    };
    if (task.trim() !== "") {
      setTasks([...tasks, newTask]);
      setTask("");
      saveTasks([...tasks, newTask]); // Зберігаємо дані після додавання завдання
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    saveTasks(tasks.filter((t) => t.id !== taskId)); // Зберігаємо дані після видалення завдання
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
    saveTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    ); // Зберігаємо дані після зміни статусу завдання
  };

  const saveTasks = async (tasks) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", jsonTasks);
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
  };

  console.log(tasks);
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
