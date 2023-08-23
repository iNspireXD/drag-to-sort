import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

type Props = {
  children: React.ReactNode;
};
type Context = {
  translateX: number;
  translateY: number;
};

const Draggable = ({ children }: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <Animated.View style={[rStyle]}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Draggable;

const styles = StyleSheet.create({});
