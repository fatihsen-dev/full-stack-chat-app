import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import messageReducer from "./message";

export const store = configureStore({
   reducer: {
      auth: authReducer,
      messages: messageReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
