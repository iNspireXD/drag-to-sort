import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Box from "./components/Box";
import Draggable from "./components/Draggable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

// Create an array of 25 elements, each with a unique index
const arr = new Array(25).fill("").map((_, i) => i);

export default function App() {
  // Create a shared value object with an initial state of an object with keys from 0 to 24, each with a value equal to its key
  const positions = useSharedValue(
    Object.assign({}, ...arr.map((item) => ({ [item]: item })))
  );

  return (
    // Wrap the entire app in a GestureHandlerRootView for gesture handling
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.wrapper}>
          {/* Map over the array of 25 elements and create a Draggable component for each one */}
          {arr.map((item) => (
            <Draggable key={item} positions={positions} id={item}>
              {/* Render a Box component inside each Draggable component */}
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
