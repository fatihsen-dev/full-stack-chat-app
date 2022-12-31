import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
   userStatus: null | true | false;
   user: {
      token: string;
      username: string;
      _id: string;
   };
}

const initialState: CounterState = {
   userStatus: null,
   user: {
      token: "",
      username: "",
      _id: "",
   },
};

export const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      login: (
         state,
         action: PayloadAction<{
            status: null | true | false;
            user: {
               token: "";
               username: "";
               _id: "";
            };
         }>
      ) => {
         state.userStatus = action.payload.status;
         state.user = action.payload.user;
      },
      logout: (state) => {
         state.userStatus = false;
         localStorage.removeItem("token");
      },
   },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
