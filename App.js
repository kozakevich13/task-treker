import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from "./screens/Main"
import DailyTasksScreen from "./screens/DailyTasksScreen"



const Stack = createStackNavigator();
const App = () => {
 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <View style={styles.container}> */}
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="DailyTasks" component={DailyTasksScreen} />
        {/* </View> */}
    </Stack.Navigator>
  </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


export default App;
