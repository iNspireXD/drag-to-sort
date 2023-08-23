import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { MARGIN } from "./Box";
import { getIndex, getPostion } from "../util";

type Props = {
  children: React.ReactNode;
  positions: any;
  id: number;
};
type Context = {
  translateX: number;
  translateY: number;
};

const Draggable = ({ children, positions, id }: Props) => {
  // Get the initial position of the draggable from the positions array
  const position = getPostion(positions.value[id]);

  // Create shared values for the x and y translation of the draggable
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  // Create a shared value to keep track of whether the gesture is active
  const isGestureActive = useSharedValue(false);

  // Use the useAnimatedReaction hook to update the position of the draggable
  // when its position in the positions array changes
  useAnimatedReaction(
    () => positions.value[id],
    (newPosition) => {
      const newPositionXY = getPostion(newPosition);
      translateX.value = withTiming(newPositionXY.x);
      translateY.value = withTiming(newPositionXY.y);
    }
  );

  // Define the gesture handler for the draggable
  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (event, context) => {
      // Store the current translation values in the context
      context.translateX = translateX.value;
      context.translateY = translateY.value;

      // Set the isGestureActive shared value to true
      isGestureActive.value = true;
    },
    onActive: (event, context) => {
      // Update the translation values based on the gesture event and the stored context values
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;

      // Get the old and new positions of the draggable
      const oldPositon = positions.value[id];
      const newPositon = getIndex(translateX.value, translateY.value);

      // If the draggable has moved to a new position, swap its position with the draggable in that position
      if (oldPositon != newPositon) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newPositon
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newPositon;
          newPositions[idToSwap] = oldPositon;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      // When the gesture ends, animate the draggable to its destination position
      const destination = getPostion(positions.value[id]);
      translateX.value = withSpring(destination.x);
      translateY.value = withSpring(destination.y);
    },
    onFinish: () => {
      // Set the isGestureActive shared value to false
      isGestureActive.value = false;
    },
  });

  // Use the useAnimatedStyle hook to create an animated style for the draggable
  const rStyle = useAnimatedStyle(() => {
    // Set the zIndex and scale based on whether the gesture is active
    const zIndex = isGestureActive.value ? 1000 : 1;
    const scale = isGestureActive.value ? 1.1 : 1;

    // Return the animated style object
    return {
      position: "absolute",
      margin: MARGIN * 2.5,
      zIndex,
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        { scale },
      ],
    };
  });

  // Render the draggable component
  return (
    <Animated.View style={[rStyle]}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Draggable;
