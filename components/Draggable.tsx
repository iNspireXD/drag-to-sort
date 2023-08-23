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
  const position = getPostion(positions.value[id]);
  console.log(position);

  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const isGestureActive = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    (newPosition) => {
      const newPositionXY = getPostion(newPosition);
      translateX.value = withTiming(newPositionXY.x);
      translateY.value = withTiming(newPositionXY.y);
    }
  );

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

      const oldPositon = positions.value[id];
      const newPositon = getIndex(translateX.value, translateY.value);
      // console.log(oldPositon, newPositon);
      if (oldPositon != newPositon) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newPositon
        );
        // console.log(idToSwap);
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newPositon;
          newPositions[idToSwap] = oldPositon;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      const destination = getPostion(positions.value[id]);
      translateX.value = withSpring(destination.x);
      translateY.value = withSpring(destination.y);
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
