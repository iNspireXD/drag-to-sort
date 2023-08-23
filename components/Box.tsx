import { StyleSheet, Text, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Define constants for the number of columns, margin, and size of each box
export const COL = 5;
export const MARGIN = 5;
export const SIZE = width / COL - MARGIN;

type Props = {
  count: number;
};

const Box = ({ count }: Props) => {
  // Set the background color based on whether the count is even or odd
  const backgroundColor = count % 2 === 0 ? "#157B84" : "#AE8DB9";
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    width: SIZE - MARGIN,
    height: SIZE - MARGIN,
    margin: MARGIN,
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
