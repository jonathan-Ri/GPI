import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const informacion = () => {
  return (
    <View style={styles.container}>
      <Text> informacion </Text>
    </View>
  );
};

export default informacion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
