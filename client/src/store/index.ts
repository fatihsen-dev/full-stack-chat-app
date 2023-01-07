import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth";
import messageData from "./messageData";

export const store = configureStore({
   reducer: {
      auth: userReducer,
      messages: messageData,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
