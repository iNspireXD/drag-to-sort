import { COL, SIZE } from "./components/Box";

export const getPostion = (index: number) => {
  "worklet";
  return {
    x: (index % COL) * SIZE,
    y: Math.floor(index / COL) * SIZE,
  };
};

export const getIndex = (x: number, y: number) => {
  "worklet";
  const row = Math.round(y / SIZE);
  const col = Math.round(x / SIZE);

  return row * COL + col;
};
