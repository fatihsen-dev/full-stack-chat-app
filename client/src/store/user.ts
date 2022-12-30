import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
   user: string;
}

const initialState: CounterState = {
   user: "",
};

export const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      incrementByAmount: (state, action: PayloadAction<number>) => {
         state.user += action.payload;
      },
   },
});

export const { incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
