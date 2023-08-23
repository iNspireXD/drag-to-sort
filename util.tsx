import { COL, SIZE } from "./components/Box";

// This function takes an index and returns the x and y position of the corresponding cell in the grid
export const getPostion = (index: number) => {
  "worklet";
  return {
    x: (index % COL) * SIZE, // x position is the remainder of index divided by the number of columns, multiplied by the size of each cell
    y: Math.floor(index / COL) * SIZE, // y position is the floor of index divided by the number of columns, multiplied by the size of each cell
  };
};

// This function takes an x and y position and returns the index of the corresponding cell in the grid
export const getIndex = (x: number, y: number) => {
  "worklet";
  const row = Math.round(y / SIZE); // row is the rounded value of y divided by the size of each cell
  const col = Math.round(x / SIZE); // col is the rounded value of x divided by the size of each cell

  return row * COL + col; // index is the row multiplied by the number of columns, plus the column
};
