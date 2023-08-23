import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Box from "./components/Box";
import Draggable from "./components/Draggable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

const arr = new Array(25).fill("").map((_, i) => i);

export default function App() {
  const positions = useSharedValue(
    Object.assign({}, ...arr.map((item) => ({ [item]: item })))
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.wrapper}>
          {arr.map((item) => (
            <Draggable key={item} positons={positions} id={item}>
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
    marginTop: Dimensions.get("window").height / 7,
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
  },
});
