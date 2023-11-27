import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';


class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>main page!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Main;
