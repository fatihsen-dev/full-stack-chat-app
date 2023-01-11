import { MessagesType, Types } from "./Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Types = {
   messages: [],
   activeUser: {
      user: {
         _id: "",
         username: "",
      },
      messages: [],
   },
};

export const counterSlice = createSlice({
   name: "messages",
   initialState,
   reducers: {
      setMessages: (state, action: PayloadAction<MessagesType>) => {
         state.messages = action.payload.messages;
      },
      setActiveUser: (
         state,
         action: PayloadAction<{
            _id?: string;
            user: {
               _id: string;
               username: string;
            };
            messages: Array<{
               user: string;
               message: string;
               _id?: string;
               date?: string;
            }>;
         }>
      ) => {
         state.activeUser = action.payload;
      },
   },
});

export const { setMessages, setActiveUser } = counterSlice.actions;
export default counterSlice.reducer;
