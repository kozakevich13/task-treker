import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DailyTasksScreen = ({ navigation, route }) => {
  const [dailyTaskText, setDailyTaskText] = useState("");
  const [dailyTasks, setDailyTasks] = useState([]);
  const { addDailyTaskToMain } = route.params || {};

  // Завантаження збережених завдань при монтажі компонента
  useEffect(() => {
    loadDailyTasks();
  }, []);

  // Збереження завдань при їх зміні
  useEffect(() => {
    saveDailyTasks();
  }, [dailyTasks]);

  // Завантаження завдань з AsyncStorage
  const loadDailyTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("dailyTasks");
      if (storedTasks) {
        setDailyTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading daily tasks:", error);
    }
  };

  // Збереження завдань в AsyncStorage
  const saveDailyTasks = async () => {
    try {
      await AsyncStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
      // Додавання завдань до списку tasks
      addTasksToMain(dailyTasks);
    } catch (error) {
      console.error("Error saving daily tasks:", error);
    }
  };

  const addDailyTask = () => {
    if (dailyTaskText) {
      const newDailyTask = {
        id: Date.now(),
        text: dailyTaskText,
      };

      setDailyTasks([...dailyTasks, newDailyTask]);
      setDailyTaskText("");

      if (addDailyTaskToMain) {
        addDailyTaskToMain(newDailyTask);
      }
    }
  };

  const removeDailyTask = (taskId) => {
    const updatedTasks = dailyTasks.filter((task) => task.id !== taskId);
    setDailyTasks(updatedTasks);
  };

  const addTasksToMain = async (tasks) => {
    try {
      // Отримання списку tasks з локального сховища
      const storedTasks = await AsyncStorage.getItem("tasks");
      const existingTasks = storedTasks ? JSON.parse(storedTasks) : [];

      // Додавання нових завдань до списку tasks
      const updatedTasks = [...existingTasks, ...tasks];

      // Збереження оновленого списку tasks
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error adding tasks to main:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text>{item.text}</Text>
      <TouchableOpacity onPress={() => removeDailyTask(item.id)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter daily task"
        value={dailyTaskText}
        onChangeText={(text) => setDailyTaskText(text)}
      />
      <Button title="Add Daily Task" onPress={addDailyTask} />

      <FlatList
        data={dailyTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  removeButton: {
    color: "red",
    marginLeft: 8,
  },
});

export default DailyTasksScreen;
