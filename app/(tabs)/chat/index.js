import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const index = () => {
  return (
    <View style={styles.container}>
      <Text> Chat  </Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
