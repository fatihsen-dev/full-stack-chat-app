import { AuthType } from "./Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthType = {
   userStatus: null,
   user: {
      token: "",
      username: "",
      _id: "",
   },
};

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      login: (state, action: PayloadAction<AuthType>) => {
         state.userStatus = action.payload.userStatus;
         state.user = action.payload.user;
      },
      logout: (state) => {
         state.userStatus = false;
         user: {
            token: "";
            username: "";
            _id: "";
         }
         localStorage.removeItem("token");
      },
   },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
