import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function EmptyScreen() {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Empty</Text>
    </View>
  );
}
