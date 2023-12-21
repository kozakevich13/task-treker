// DailyTasks.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DailyTasks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Tasks</Text>
      {/* Додайте ваші елементи сторінки тут */}
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
});

export default DailyTasks;
