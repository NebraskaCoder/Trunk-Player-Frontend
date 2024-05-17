import { configureStore } from "@reduxjs/toolkit";

import layoutReducer from "@/state/slices/layoutSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      layout: layoutReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();
