import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Box from "./components/Box";
import Draggable from "./components/Draggable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const arr = new Array(25).fill("").map((_, i) => i);

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.wrapper}>
          {arr.map((item) => (
            <Draggable key={item}>
              <Box count={item} key={item} />
            </Draggable>
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
  },
});
