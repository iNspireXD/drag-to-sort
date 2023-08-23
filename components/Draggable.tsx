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
import { MARGIN } from "./Box";
import { getPostion } from "../util";

type Props = {
  children: React.ReactNode;
  positons: any;
  id: number;
};
type Context = {
  translateX: number;
  translateY: number;
};

const Draggable = ({ children, positons, id }: Props) => {
  const position = getPostion(positons.value[id]);
  console.log(position);

  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const isGestureActive = useSharedValue(false);

  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
      isGestureActive.value = true;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onFinish: () => {
      isGestureActive.value = false;
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 1000 : 1;
    const scale = isGestureActive.value ? 1.1 : 1;

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

  return (
    <Animated.View style={[rStyle]}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Draggable;
