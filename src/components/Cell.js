import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";

export const Cell = ({ color }) => {
  const styles = StyleSheet.create({
    cell: {
      backgroundColor: (color ? "black" : "white"),
      flex: 1,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 0,
    },
  });
  

  return <View style={styles.cell}></View>;
};