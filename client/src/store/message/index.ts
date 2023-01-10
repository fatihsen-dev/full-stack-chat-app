import { MessageInterface } from "./Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: MessageInterface = {
   messages: [],
   activeUser: {
      username: "",
      _id: "",
   },
};

export const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      setMessages: (state, action: PayloadAction<>) => {},
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

export const { setMessages, setActiveUser } = counterSlice.actions;
export default counterSlice.reducer;
