import { COL, SIZE } from "./components/Box";

export const getPostion = (index: number) => {
  "worklet";
  return {
    x: (index % COL) * SIZE,
    y: Math.floor(index / COL) * SIZE,
  };
};
