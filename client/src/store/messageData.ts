import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
   // messages: string;
   activeUser: {
      username: string;
      _id: string;
   };
}

const initialState: CounterState = {
   // users: "",
   activeUser: {
      username: "",
      _id: "",
   },
};

export const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      setUsers: (state, action: PayloadAction<string>) => {
         // state.users = "";
      },
      setActiveUser: (
         state,
         action: PayloadAction<{
            username: string;
            _id: string;
         }>
      ) => {
         state.activeUser = action.payload;
      },
   },
});

export const { setUsers, setActiveUser } = counterSlice.actions;
export default counterSlice.reducer;
